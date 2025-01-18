import { prisma } from '@/connection'
import { ITransaction } from './types'
import { decodeToken } from '@/utils/jwt'
import { Status } from './types'
import { v4 } from 'uuid'
import { addHours } from 'date-fns'
import { differenceInDays } from 'date-fns'

const midtransClient = require('midtrans-client')

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
  console.log(cityId, countryId)

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
        expiryDate: addHours(new Date(), 1),
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

    const params = {
      transaction_details: {
        order_id: setTransaction.id,
        gross_amount: setTransaction.total,
      },
      finish_url: 'http://localhost:3000/transaction/all',
      callback_url: 'http://localhost:5000/transaction/callback',
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

export const handleExpiredTransaction = async () => {
  const now = new Date()

  const expiredTransactions = await prisma.transaction.findMany({
    where: {
      expiryDate: {
        lte: now,
      },
      transactionStatus: {
        some: {
          status: Status.WAITING_FOR_PAYMENT,
        },
      },
    },
    include: {
      transactionStatus: true,
    },
  })

  for (const transaction of expiredTransactions) {
    await prisma.transactionStatus.create({
      data: {
        transactionId: transaction.id,
        status: Status.EXPIRED,
      },
    })
  }
}

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
