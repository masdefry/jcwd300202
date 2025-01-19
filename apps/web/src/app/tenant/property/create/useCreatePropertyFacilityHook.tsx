// 'use client'

// import React, { useState } from 'react'
// import toast from 'react-hot-toast'
// import useMutateCreatePropertyFacilityApi from './useMutateCreatePropertyFacilityApi'

// const useCreatePropertyFacilityHook = () => {
//   const [showCreatePropertyFacilityForm, setShowCreatePropertyFacilityForm] =
//     useState(false)
//   const [dataCreatePropertyFacility, setDataCreatePropertyFacility] = useState({
//     name: '',
//     file: [] as File[],
//   })

//   const { mutateCreatePropertyFacility, isPendingCreatePropertyFacility } =
//     useMutateCreatePropertyFacilityApi({
//       dataCreatePropertyFacility,
//       onSuccess: (res) => {
//         setShowCreatePropertyFacilityForm(false)
//         setDataCreatePropertyFacility({
//           name: '',
//           file: [] as File[],
//         })
//         toast((t) => (
//           <span className="flex gap-2 items-center font-semibold justify-center text-xs">
//             {res?.message}
//           </span>
//         ))
//       },
//       onError: (err: any) => {
//         setShowCreatePropertyFacilityForm(false)
//         setDataCreatePropertyFacility({
//           name: '',
//           file: [] as File[],
//         })
//         toast((t) => (
//           <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
//             {err?.response?.data?.message || 'Connection error!'}
//           </span>
//         ))
//       },
//     })

//   return {
//     mutateCreatePropertyFacility,
//     isPendingCreatePropertyFacility
//   }
// }

// export default useCreatePropertyFacilityHook
