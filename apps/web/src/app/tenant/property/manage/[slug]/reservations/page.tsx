'use client'

import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'   
import { useParams } from 'next/navigation';
import instance from '@/utils/axiosInstance' 

const ReservationPage = () => {
  const { slug } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('WAITING_FOR_CONFIRMATION_PAYMENT')
  const [selectedReservation, setSelectedReservation] = useState<any>(null)

  const open = (reservation: any) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  }
  const close = () => {
    setIsModalOpen(false)
    setSelectedReservation(reservation)
  }

  const {data: reservation, isLoading: isLoadingReservation} = useQuery({
    queryKey: ['getReservations', slug],
    queryFn: async() => {
        const res = await instance.get(`/reservation/${slug}`)
        console.log('RESERVATION DATA', res.data.data)
        return res.data.data
    }
  })  

    const { mutate: updateReservationStatus, isPending: isUpdating } = useMutation({
        mutationFn: async (data: { transactionId: string; status: string }) => {
            const response = await instance.post('/reservation/update', data);
            return response.data;
        },
        onSuccess: () => {
        console.log('success')
            setIsModalOpen(false); 
        },
        onError: (error) => {
            console.error('Error updating status:', error);
        },
    });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  if (isLoadingReservation && isUpdating) {
    return <div>Loading...</div>;
  }
  return (
    <main className='w-full h-screen'>
      <section className='m-auto max-w-screen-xl w-full h-full'>
        <table className="min-w-full table-auto border !rounded mt-[3rem]">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">Check In Date</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">Check Out Date</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">Room Type</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-2 py-3 text-left text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {reservation?.map((item: any, index: number) => (
                <tr key={index} className="border-t">
                    <td className="px-4 py-4 text-xs text-gray-700">{item.id}</td>
                    <td className="px-2 py-4 text-xs text-gray-700">{item.user.email}</td>
                    <td className="px-2 py-4 text-xs text-gray-700">{dateFormatter.format(new Date(item.checkInDate))}</td>
                    <td className="px-2 py-4 text-xs text-gray-700">{dateFormatter.format(new Date(item.checkOutDate))}</td>
                    <td className="px-2 py-4 text-xs text-gray-700">{item.room.name}</td>
                    {item.transactionStatus[0]?.status === 'WAITING_FOR_CONFIRMATION_PAYMENT' ? (
                        <td className="px-2 py-4 text-xs">
                            <p className='bg-orange-500 px-4 py-1 rounded w-[17rem] text-center text-white'>WAITING FOR CONFIRMATION PAYMENT</p>
                        </td>
                    ) : item.transactionStatus[0]?.status === 'PAID' ? (
                        <td className="px-2 py-4 text-xs">
                            <p className='bg-blue-500 px-4 py-1 rounded w-[5rem] text-center text-white'>PAID</p>
                        </td>
                    ) : item.transactionStatus[0]?.status === 'CANCELLED' ? (
                        <td className="px-2 py-4 text-xs">
                            <p className='bg-red-500 px-4 py-1 rounded w-[8rem] text-center text-white'>CANCELLED</p>
                        </td>
                    ) : (
                        <td className="px-2 py-4 text-xs text-gray-700">
                            {item.transactionStatus[0]?.status || 'No Status'}
                        </td>
                    )}
                    <td className="px-2 py-4 text-xs text-gray-700">
                        <button 
                            onClick={() => open(item)}
                            type='button'
                            className='px-4 py-1.5 border rounded shadow cursor-pointer text-sm'>Edit</button>

                            {/* Modal */}
                            {isModalOpen && selectedReservation?.id === item.id && (
                                <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle" open>
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Edit Reservation Status</h3>
                                        <p className="py-4">Please choose the new status for the reservation.</p>

                                        <label htmlFor="status" className="block mb-2 font-medium">
                                        Status
                                        </label>
                                        <select
                                            id="status"
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            className="block w-full border rounded p-2 mb-4"
                                            >
                                            <option value="WAITING_FOR_CONFIRMATION_PAYMENT">WAITING FOR CONFIRMATION PAYMENT</option>
                                            <option value="PAID">PAID</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>

                                        <div className="modal-action">
                                        <button
                                            className="px-4 py-1.5 border rounded shadow cursor-pointer text-sm"
                                            onClick={close}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="px-4 py-1.5 border rounded shadow cursor-pointer text-sm bg-black text-white"
                                            type='button'
                                            onClick={() =>
                                                updateReservationStatus({
                                                  transactionId: item.id,
                                                  status: newStatus, 
                                                })
                                            }
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? 'Updating...' : 'Submit'}
                                        </button>
                                        </div>
                                    </div>
                                </dialog>
                            )}
                    </td>
                </tr>

                
              ))}
            </tbody>
        </table>
      </section>
    </main>
  )
}

export default ReservationPage
