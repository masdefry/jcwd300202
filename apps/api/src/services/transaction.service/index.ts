import { prisma } from '@/connection'
import { ITransaction } from './types'
import { decodeToken } from '@/utils/jwt'
import { Status } from './types'
import { v4 } from 'uuid'
import { addHours } from 'date-fns'
import { differenceInDays, differenceInHours } from 'date-fns'
import axios from 'axios'


const midtransClient = require('midtrans-client')
const MIDTRANS_SERVER_KEY = 'SB-Mid-server-_RX4QQiIGu3NfkORVQFO-0Zg'

const tokenSnap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-_RX4QQiIGu3NfkORVQFO-0Zg',
  clientKey: 'SB-Mid-client-RHLdbA1UmPF_rh8s',
})

export const createTransactionService = async ({
  checkInDate,
  checkOutDate,
  total,
  price,
  qty,
  adult,
  children,
  userId,
  tenantId,
  propertyId,
  roomId,
}: ITransaction) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  console.log(userId)

  if (!isUserExist?.id || isUserExist.deletedAt)
    throw { msg: 'User not found!', status: 404 }

  const propertyInTransaction = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  })

  if (!propertyInTransaction?.id) {
    throw new Error(`Could not found property`)
  }

  const roomInTransaction = await prisma.propertyRoomType.findUnique({
    where: {
      id: roomId,
    },
  })

  if (!roomInTransaction?.id) {
    throw new Error(`Could not found room type in this property`)
  }

  const countryId = propertyInTransaction?.countryId as number
  const cityId = propertyInTransaction?.cityId as number
  const nights = differenceInDays(new Date(checkOutDate), new Date(checkInDate))
  
  const expireDurationInHours = 1;

  return await prisma.$transaction(async (tx) => {
    const uuid = v4()
    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const id = `ORDER_${uuid.slice(0, 8)}_${uuid.slice(9, 13)}_${currentDate}_${uuid.slice(14, 18)}`

    const setTransaction = await tx.transaction.create({
      data: {
        id: id,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        nights,
        total: price * qty,
        price: price,
        qty: qty,
        adult: Number(adult),
        children: Number(children),
        expiryDate: addHours(new Date(), expireDurationInHours),
        userId: userId,
        tenantId: tenantId,
        propertyId: propertyId,
        roomId: roomId,
        countryId: countryId,
        cityId: cityId,
        transactionStatus: {
          create: [{ status: Status.WAITING_FOR_PAYMENT }],
        },
      },
    })

    const splitId = setTransaction.id.replace('ORDER_', '')
    
    const params = {
      transaction_details: {
        order_id: setTransaction.id,
        gross_amount: setTransaction.total,
      },
      "callbacks": {
        "finish": `https://0da6-103-47-133-164.ngrok-free.app/${splitId}`
      }
    }

    const snapTokenResponse = await tokenSnap.createTransaction(params)
    const snapToken = snapTokenResponse.token
    const redirectUrl = snapTokenResponse.redirect_url

    await tx.transaction.update({
      where: {
        id: setTransaction.id,
      },
      data: {
        snapToken: snapToken,
        redirectUrl: redirectUrl,
      },
    })

    const room = await prisma.propertyRoomType.findUnique({
      where: {
        id: roomId,
      },
      include: {
        property: true,
      },
    })

    return {
      id,
      snapToken,
      redirectUrl,
      checkInDate,
      checkOutDate,
      nights,
      total,
      price,
      qty,
      adult,
      children,
      roomName: room?.name,
      propertyName: room?.property.name,
    }
  })
}

export const getTransactionStatusService = async (id: string) => {
  const res = await axios.get(`https://api.sandbox.midtrans.com/v2/${id}/status`, {
    auth: {
      username: MIDTRANS_SERVER_KEY,
      password: ''
    },
  })

  const {
    status_code,
    gross_amount,
    order_id,
    payment_type,
    signature_key,
    transaction_status,
    va_numbers,
  } = res.data

  console.log(`Transaction ID: ${id} - Status: ${transaction_status}`);

  const latestTransaction = await prisma.transactionStatus.findMany({
    where: {
      transactionId: id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
  })

  if(!latestTransaction || latestTransaction.length === 0){
    console.log(`Transaction ${id} not found`)
    return;
  }

  const latestStatus = latestTransaction[0].status
  const splitId = id.replace('ORDER_', '')

  if(transaction_status === 'settlement' && latestStatus === 'WAITING_FOR_PAYMENT'){
    await prisma.transactionStatus.create({
      data: {
        transactionId: id,
        status: 'WAITING_FOR_CONFIRMATION_PAYMENT'
      }
    })

    return {
      success: true,
      message: 'Transaction settled successfully',
      redirectUrl: `http://localhost:3000/user/purchase-detail/${splitId}`,
      data: {
        status_code,
        gross_amount,
        order_id,
        payment_type,
        signature_key,
        transaction_status,
        va_numbers
      }
    };
  } 

  const now = new Date()
  const transactionCreatedAt = new Date(latestTransaction[0].createdAt)
  const hoursDifference = differenceInHours(now, transactionCreatedAt)

  if(latestStatus === 'WAITING_FOR_PAYMENT' && transaction_status !== 'settlement' && hoursDifference >=1){
    await prisma.transactionStatus.create({
      data: {
        transactionId: id,
        status: Status.EXPIRED
      }
    })
  }

  return {
    status_code,
    gross_amount,
    order_id,
    payment_type,
    signature_key,
    transaction_status,
    va_numbers
  }
}


export const updateTransactionStatusService = async (
  order_id: string,
  status: Status,
) => {
  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: order_id,
    },
    data: {
      transactionStatus: {
        create: {
          status: status,
        },
      },
    },
  })

  return updatedTransaction
}

// export const handleExpiredTransaction = async () => {
//   const now = new Date()

//   const expiredTransactions = await prisma.transaction.findMany({
//     where: {
//       expiryDate: {
//         lte: now,
//       },
//     },
//     include: {
//       transactionStatus: {
//         orderBy: {
//           createdAt: 'desc'
//         },
//         take: 1
//       }
//     },
//   })

//   for (const transaction of expiredTransactions) {
//     const hoursDifference = differenceInHours(now, new Date(transaction.createdAt));
//     const daysDifference = differenceInDays(now, new Date(transaction.createdAt));

//     if(hoursDifference >=1){
//       const latestStatus = transaction.transactionStatus[0]
//       console.log(latestStatus)

//       if(latestStatus && latestStatus.status === Status.WAITING_FOR_PAYMENT){
//         await prisma.transactionStatus.create({
//           data: {
//             transactionId: transaction.id,
//             status: Status.EXPIRED
//           }
//         })
//       }
//     }
//   }
// }

export const transactionHistoryService = async (id: string) => {
  let transactions: any = []
  await prisma.$transaction(
    async (tx) => {
      transactions = await tx.transaction.findMany({
        where: {
          userId: id,
        },
        select: {
          id: true,
          checkInDate: true,
          checkOutDate: true,
          nights: true,
          total: true,
          price: true,
          qty: true,
          adult: true,
          children: true,
          expiryDate: true,
          snapToken: true,
          redirectUrl: true,
          room: {
            select: {
              id: true,
              name: true,
              property: {
                select: {
                  id: true,
                  name: true,
                  country: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  city: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          transactionStatus: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            select: {
              id: true,
              status: true,
              transactionId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: {
          expiryDate: 'desc',
        },
      })
    },
    {
      timeout: 10000,
    },
  )

  if (!Array.isArray(transactions) || transactions.length <= 0) {
    return null
  }

    return transactions
}

export const getTransactionByIdService = async(id: string) => {
    const transaction = await prisma.transaction.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            checkInDate: true,
            checkOutDate: true,
            nights: true,
            total: true,
            price: true,
            qty: true,
            adult: true,
            children: true,
            expiryDate: true,
            snapToken: true,
            redirectUrl: true,
            createdAt: true,
            room: {
                select: {
                    id: true,
                    name: true,
                    property: {
                        select: {
                            id: true,
                            name: true,
                            country: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                            city: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            transactionStatus: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1,
                select: {
                    id: true,
                    status: true,
                    transactionId: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            transactionUpload: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1,
              select: {
                id: true,
                directory: true,
                filename: true,
              }
            }
        }
    })

    if(!transaction){
        return null
    }

    return transaction;
}

export const cancelTransactionService = async(id: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  })

  if (!transaction) {
      return null; 
  }


  const updatedTransaction = await prisma.transactionStatus.create({
    data: {
        status: 'CANCELLED', 
        transactionId: id,
    },
  })

  return updatedTransaction
}

export const uploadPaymentService = async(id: string, filePath: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id
    },
    include: {
      transactionStatus: true
    }
  })

  if(!transaction) {
    return null
  }

  const transactionStatus = transaction.transactionStatus[0]; 

  if (transactionStatus) {
    const status = transactionStatus.status;
  
    if (status === 'WAITING_FOR_PAYMENT') {
      return { message: 'You need to proceed with the payment.' };
    }
  } else {
    return { message: 'Transaction status not found.' };
  }

  const filename = filePath.split('/').pop() || 'default_filename';

  const uploadTransaction = await prisma.transactionUpload.create({
    data: {
      directory: filePath,
      filename: filename,
      transactionId: id
    }
  })

  return uploadTransaction

}