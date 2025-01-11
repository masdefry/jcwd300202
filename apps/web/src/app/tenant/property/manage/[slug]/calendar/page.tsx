'use client'

import { Checkbox } from '@/components/ui/checkbox'
import Separator from '@/features/auth/components/Separator'
import TextInput from '@/features/user/profile/components/TextInput'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineSell } from 'react-icons/md'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaFire, FaRegCalendar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { addDays, addHours, isBefore } from 'date-fns'
import 'rsuite/Calendar/styles/index.css'
import { Calendar } from 'rsuite'
import { differenceInDays } from 'date-fns'

const CalendarPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { view: string }
}) => {
  const [ selectedPropertyRoomType, setSelectedPropertyRoomType ] = useState<any>()
  const [ dataSeasonsByProperty, setDataSeasonsByProperty] = useState<any>()
  const [ propertyRoomTypes, setPropertyRoomTypes] = useState<any>()
  const fetchDataSeasonsByProperty = async() => {
    const res = await instance.get(`season/property/${params?.slug}`)
        if(res?.status === 200) {
          setDataSeasonsByProperty(res?.data?.data)
          setPropertyRoomTypes(res?.data?.data?.property?.propertyRoomType)
        }
  }
  useEffect(() => {
    fetchDataSeasonsByProperty()
  }, [])

  const paramsSearch = new URLSearchParams()
  const [searchParamsWithValue, setSearchParamsWithValue] = useState<any>([])
  const handleSearchParams = (orderBy: string, value: string) => {
    let isOrderByExistIndex = -1
    if (searchParamsWithValue.length > 0) {
      isOrderByExistIndex = searchParamsWithValue.findIndex(
        (item: any) => item[0] === orderBy,
      )
    }
    if (isOrderByExistIndex <= -1) {
      setSearchParamsWithValue((state: any) => {
        state.push([orderBy, value])
        return state
      })
    } else {
      setSearchParamsWithValue((state: any) => {
        state[isOrderByExistIndex] = [orderBy, value]
        return state
      })
    }
    searchParamsWithValue.forEach((item: any) => {
      paramsSearch.set(item[0], item[1])
    })
    window.history.pushState({}, '', '?' + paramsSearch.toString())
  }
  const [dateRange, setDateRange] = useState<{
    startDate: string | null
    endDate: string | null
    id?: string | number
    name?: string
  }>({
    startDate: null,
    endDate: null,
  })
  const [dataPropertyRoomTypeSeason, setDataPropertyRoomTypeSeason] = useState<any>({
    basePrice: 0,
    isBulk: false,
    roomPrices: 0,
    roomsToSell: 0,
    totalRooms: 0,
    pricePercentage: '',
    availability: true,
    propertyRoomTypeId: 0,
    name: '',
    seasonId: '',
    seasonalPriceId: '',
    startDate: '',
    endDate: '',
    isPeak: false,
  })
  const [dataBulkSeason, setDataBulkSeason] = useState<any>({
    pricePercentage: 100,
    availability: true,
    name: '',
    seasonId: '',
    startDate: '',
    endDate: '',
    isPeak: false,
  })
  const [roomName, setRoomName] = useState('')
  const [roomAvailability, setRoomAvailability] = useState(true)
  const [isPeakSeason, setIsPeakSeason] = useState(false)
  const [changeDate, setChangeDate] = useState(true)
  const handleDateRange = (date: Date) => {
    const dateISOString = date.toISOString()
    if(selectRoom === 'all-rooms') {
      if (isBefore(addHours(new Date(), 7), date)) {
        if (
          !dataBulkSeason?.startDate ||
          isBefore(date, dataBulkSeason.startDate) ||
          (dataBulkSeason?.startDate &&
            dataBulkSeason?.endDate &&
            dataBulkSeason?.endDate !== dateISOString)
        ) {
          setDataBulkSeason((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
        } else if (dataBulkSeason?.endDate === dateISOString) {
          setDataBulkSeason((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
        } else if (dataBulkSeason?.startDate && !dataBulkSeason?.endDate) {
          setDataBulkSeason((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = dateISOString
            return state
          })
        }
      }
    } else {
      if (isBefore(addHours(new Date(), 7), date)) {
        if (
          !dataPropertyRoomTypeSeason?.startDate ||
          isBefore(date, dataPropertyRoomTypeSeason.startDate) ||
          (dataPropertyRoomTypeSeason?.startDate &&
            dataPropertyRoomTypeSeason?.endDate &&
            dataPropertyRoomTypeSeason?.endDate !== dateISOString)
        ) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = dateISOString
            return state
          })
        } else if (dataPropertyRoomTypeSeason?.endDate === dateISOString) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
          setDateRange((state: any) => {
            state.endDate = null
            state.startDate = null
            return state
          })
        } else if (dataPropertyRoomTypeSeason?.startDate && !dataPropertyRoomTypeSeason?.endDate) {
          setDataPropertyRoomTypeSeason((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDateRange((state: any) => {
            state.endDate = dateISOString
            return state
          })
          setDataPropertyRoomTypeSeason({
            basePrice: selectedPropertyRoomType?.price,
            isBulk: false,
            roomPrices: selectedPropertyRoomType?.price,
            roomsToSell: selectedPropertyRoomType?.totalRooms,
            totalRooms: selectedPropertyRoomType?.totalRooms,
            pricePercentage: 100,
            availability: true,
            propertyRoomTypeId: selectedPropertyRoomType?.id,
            name: '',
            seasonId: '',
            seasonalPriceId: '',
            startDate: dateRange?.startDate,
            endDate: dateRange?.endDate,
            isPeak: false,
          })
          // mutateGetSeasonalPriceByRoomType({startDate:dataPropertyRoomTypeSeason?.startDate, endDate:dataPropertyRoomTypeSeason?.endDate })
        }
        // console.log(dataPropertyRoomTypeSeason.startDate)
        // console.log(selectedPropertyRoomType.name)
    }}
  }
  const [dataRoomPerDate, setDataRoomPerDate] = useState<any>()
  const [ratesPercentage, setRatesPercentage] = useState(100)
  const [isEditRateByPercentage, setIsEditRateByPercentage] = useState(true)
  const [activeRoomSetter, setActiveRoomSetter] = useState<any>({
    startDate: '',
    endDate: '',
    name: '',
  })
  const {
    mutate: mutateGetSeasonalPrice,
    isPending: isPendingGetSeasonalPrice,
  } = useMutation({
    mutationFn: async ({
      propertyRoomTypeId,
      date,
    }: {
      propertyRoomTypeId: number
      date: Date
    }) => {
      const res = await instance.get(
        `/season/single/search?propertyRoomTypeId=${propertyRoomTypeId}&date=${date}`,
      )
      return res?.data
    },
    onSuccess: (res) => {
      setDataPropertyRoomTypeSeason({
        pricePercentage: '',
        basePrice: res?.data?.seasonalPrice?.basePrice,
        isBulk: false,
        totalRooms: res?.data?.seasonalPrice?.totalRooms,
        roomPrices:
          res?.data?.seasonalPrice?.price ||
          res?.data?.seasonalPrice?.basePrice,
        roomsToSell:
          res?.data?.seasonalPrice?.roomToRent ||
          res?.data?.seasonalPrice?.totalRooms,
        seasonalPriceId: res?.data?.seasonalPrice?.id,
        seasonId: res?.data?.season?.id || '',
        availability:
          res?.data?.seasonalPrice?.roomAvailability === undefined
            ? true
            : res?.data?.seasonalPrice?.roomAvailability,
        propertyRoomTypeId: res?.data?.season?.propertyRoomTypeId,
        name: res?.data?.season?.name,
        startDate: dataPropertyRoomTypeSeason.startDate,
        endDate: dataPropertyRoomTypeSeason.endDate,
        isPeak: res?.data?.seasonalPrice?.isPeak || false,
      })
      setDataRoomPerDate(res?.data)
      setRoomAvailability(res?.data?.seasonalPrice?.roomAvailability)
      setIsPeakSeason(res?.data?.seasonalPrice?.isPeak)
      setRatesPercentage(
        Math.floor(
          (res?.data?.seasonalPrice?.price /
            res?.data?.seasonalPrice?.basePrice) *
            100,
        ),
      )
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center text-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutate: mutateGetSeasonalPriceByRoomType,
    isPending: isPendingGetSeasonalPriceByRoomType,
  } = useMutation({
    mutationFn: async ({
      startDate,
      endDate,
      seasonId
    }: {
      endDate: Date
      seasonId: number | string
      startDate: Date
    }) => {
      const res = await instance.get(
        `/season/single/${seasonId}?startDate=${startDate}&endDate=${endDate}`,
      )
      return res?.data
    },
    onSuccess: (res) => {
      setDataPropertyRoomTypeSeason({
        basePrice: res?.data?.propertySeason?.propertyRoomType?.price,
        isBulk: true,
        totalRooms: res?.data?.propertySeason?.propertyRoomType?.totalRooms,
        roomPrices: (Number(res?.data?.propertySeason?.propertyRoomType?.price) * Number(res?.data?.propertySeason?.ratesPercentage)) / 100,
        roomsToSell:
          res?.data?.propertySeason?.roomToRent ||
          res?.data?.propertySeason?.propertyRoomType?.totalRooms,
        seasonalPriceId: res?.data?.seasonalPrice?.id,
        seasonId: res?.data?.propertySeason?.id,
        pricePercentage: res?.data?.propertySeason?.ratesPercentage || 100 ,
        availability:
          res?.data?.propertySeason?.availability === undefined
            ? true
            : res?.data?.propertySeason?.availability,
        propertyRoomTypeId: res?.data?.propertySeason?.propertyRoomType?.id,
        name: res?.data?.propertySeason?.name,
        startDate: res?.data?.propertySeason?.startDate,
        endDate: res?.data?.propertySeason?.endDate,
        isPeak: res?.data?.propertySeason?.isPeak ? res?.data?.propertySeason?.isPeak : false,
      })
      setDataRoomPerDate(res?.data)
      // setRoomAvailability(res?.data?.seasonalPrice?.roomAvailability)
      // setIsPeakSeason(res?.data?.seasonalPrice?.isPeak)
      setRatesPercentage(
        Math.floor(
          (res?.data?.seasonalPrice?.price /
            res?.data?.seasonalPrice?.basePrice) *
            100,
        ),
      )
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center text-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutate: mutateDeletePropertySeason, isPending: isPendingDeletePropertySeason } = useMutation({
    mutationFn: async() => {
      const res = await instance.delete(`/season/property/${params?.slug}?seasonId=${dataBulkSeason?.seasonId}`)
      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataBulkSeason({
        pricePercentage: 100,
        availability: true,
        name: '',
        seasonId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutate: mutateDeleteSeason, isPending: isPendingDeleteSeason } = useMutation({
    mutationFn: async() => {
      const res = await instance.delete(`/season/${dataPropertyRoomTypeSeason?.propertyRoomTypeId}?seasonalPriceId=${dataPropertyRoomTypeSeason?.seasonalPriceId}`)
      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataPropertyRoomTypeSeason({
        basePrice: 0,
        isBulk: false,
        roomPrices: 0,
        roomsToSell: 0,
        totalRooms: 0,
        pricePercentage: '',
        availability: true,
        propertyRoomTypeId: 0,
        name: '',
        seasonId: '',
        seasonalPriceId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      setActiveRoomSetter({
        startDate: '',
        endDate: '',
        name: '',
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutate: mutateCreateSeason, isPending: isPendingCreateSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.post('/season', {
          roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
          roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
          availability: dataPropertyRoomTypeSeason?.availability,
          propertyRoomTypeId: dataPropertyRoomTypeSeason?.propertyRoomTypeId,
          name: dataPropertyRoomTypeSeason?.name,
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
          isPeak: dataPropertyRoomTypeSeason?.isPeak,
        })

        return res?.data
      },
      onSuccess: (res: any) => {
        setDateRange({
          startDate: null,
          endDate: null,
        })
        setDataPropertyRoomTypeSeason({
          basePrice: 0,
          isBulk: false,
          roomPrices: 0,
          roomsToSell: 0,
          totalRooms: 0,
          pricePercentage: '',
          availability: true,
          propertyRoomTypeId: 0,
          name: '',
          seasonId: '',
          seasonalPriceId: '',
          startDate: '',
          endDate: '',
          isPeak: false,
        })
        setActiveRoomSetter({
          startDate: '',
          endDate: '',
          name: '',
        })
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const {
    mutate: mutateCreatePropertySeason,
    isPending: isPendingCreatePropertySeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/season/property/${params?.slug}`, {
        pricePercentage: dataBulkSeason?.pricePercentage,
        availability: dataBulkSeason?.availability,
        name: dataBulkSeason?.name,
        startDate: dataBulkSeason?.startDate,
        endDate: dataBulkSeason?.endDate,
        isPeak: dataBulkSeason?.isPeak,
      })

      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataBulkSeason({
        pricePercentage: 100,
        availability: true,
        name: '',
        seasonId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutate: mutateUpdatePropertySeason,
    isPending: isPendingUpdatePropertySeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.put(`/season/property/${params?.slug}`, {
        pricePercentage: dataBulkSeason?.pricePercentage,
        seasonId: dataBulkSeason?.seasonId,
        availability: dataBulkSeason?.availability,
        name: dataBulkSeason?.name,
        startDate: dataBulkSeason?.startDate,
        endDate: dataBulkSeason?.endDate,
        isPeak: dataBulkSeason?.isPeak,
      })

      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataBulkSeason({
        pricePercentage: 100,
        availability: true,
        name: '',
        seasonId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })
  
  const {
    mutate: mutateCreateOneSeason,
    isPending: isPendingCreateOneSeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/season/single`, {
        seasonId: dataPropertyRoomTypeSeason?.seasonId,
        roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
        roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
        availability: dataPropertyRoomTypeSeason?.availability,
        pricePercentage: dataPropertyRoomTypeSeason?.pricePercentage,
        propertyRoomTypeId: selectRoom,
        name: dataPropertyRoomTypeSeason?.name,
        startDate: activeRoomSetter?.startDate || dateRange?.startDate,
        endDate: activeRoomSetter?.endDate || dateRange?.endDate,
        isPeak: dataPropertyRoomTypeSeason?.isPeak,
      })
      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataPropertyRoomTypeSeason({
        basePrice: 0,
        isBulk: false,
        roomPrices: 0,
        roomsToSell: 0,
        totalRooms: 0,
        pricePercentage: '',
        availability: true,
        propertyRoomTypeId: 0,
        name: '',
        seasonId: '',
        seasonalPriceId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutate: mutateUpdateSingleSeason,
    isPending: isPendingUpdateSingleSeason,
  } = useMutation({
    mutationFn: async () => {
      console.log(dataPropertyRoomTypeSeason?.startDate)
      console.log(dataPropertyRoomTypeSeason?.endDate)
      const res = await instance.put(`/season/single/${dataPropertyRoomTypeSeason?.seasonId}`, {
        seasonId: dataPropertyRoomTypeSeason?.seasonId,
        roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
        roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
        availability: dataPropertyRoomTypeSeason?.availability,
        pricePercentage: dataPropertyRoomTypeSeason?.pricePercentage,
        propertyRoomTypeId: selectRoom,
        name: dataPropertyRoomTypeSeason?.name,
        startDate: dataPropertyRoomTypeSeason?.startDate,
        endDate: dataPropertyRoomTypeSeason?.endDate,
        isPeak: dataPropertyRoomTypeSeason?.isPeak,
      })
      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataPropertyRoomTypeSeason({
        basePrice: 0,
        isBulk: false,
        roomPrices: 0,
        roomsToSell: 0,
        totalRooms: 0,
        pricePercentage: '',
        availability: true,
        propertyRoomTypeId: 0,
        name: '',
        seasonId: '',
        seasonalPriceId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const {
    mutate: mutateDeleteSingleSeason,
    isPending: isPendingDeleteSingleSeason,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.delete(`/season/single/${dataPropertyRoomTypeSeason?.seasonId}?propertyRoomTypeId=${selectedPropertyRoomType?.id}`)
      return res?.data
    },
    onSuccess: (res: any) => {
      setDateRange({
        startDate: null,
        endDate: null,
      })
      setDataPropertyRoomTypeSeason({
        basePrice: 0,
        isBulk: false,
        roomPrices: 0,
        roomsToSell: 0,
        totalRooms: 0,
        pricePercentage: '',
        availability: true,
        propertyRoomTypeId: 0,
        name: '',
        seasonId: '',
        seasonalPriceId: '',
        startDate: '',
        endDate: '',
        isPeak: false,
      })
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

  const { mutate: mutateUpdateSeason, isPending: isPendingUpdateSeason } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.put(`/season/${dataPropertyRoomTypeSeason?.propertyRoomTypeId}`, {
          seasonId: dataPropertyRoomTypeSeason?.seasonId,
          roomPrices: dataPropertyRoomTypeSeason?.roomPrices,
          roomsToSell: dataPropertyRoomTypeSeason?.roomsToSell,
          availability: dataPropertyRoomTypeSeason?.availability,
          name: dataPropertyRoomTypeSeason?.name,
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
          isPeak: dataPropertyRoomTypeSeason?.isPeak,
        })

        return res?.data
      },
      onSuccess: (res: any) => {
        setDateRange({
          startDate: null,
          endDate: null,
        })
        setDataPropertyRoomTypeSeason({
          basePrice: 0,
          isBulk: false,
          roomPrices: 0,
          roomsToSell: 0,
          totalRooms: 0,
          pricePercentage: '',
          availability: true,
          propertyRoomTypeId: 0,
          name: '',
          seasonId: '',
          seasonalPriceId: '',
          startDate: '',
          endDate: '',
          isPeak: false,
        })
        setActiveRoomSetter({
          startDate: '',
          endDate: '',
          name: '',
        })
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState('list-view')
  const [selectRoom, setSelectRoom] = useState('all-rooms')

  const { mutate: mutateDataSeasonsByPropertyRoomType, isPending: isPendingDataSeasonsByPropertyRoomType } = useMutation({
    mutationFn: async() => {
      const res = await instance.get(`season/${selectRoom}`)
      console.log(res)
      setDataSeasonsByProperty(res?.data?.data)
      return res
    }
  })

  const { mutate: mutateDataSeasonsByProperty, isPending: isPendingDataSeasonsByProperty } = useMutation({
    mutationFn: async() => {
      const res = await instance.get(`season/property/${params?.slug}`)
      console.log(res)
      setDataSeasonsByProperty(res?.data?.data)
      return res
    }
  })
  const handleRoomName = (value: string) => {
    const findIndex =
      dataSeasonsByProperty?.property?.propertyRoomType?.findIndex(
        (item: any) => Number(item?.id) === Number(value),
      )
    setRoomName(
      dataSeasonsByProperty?.property?.propertyRoomType[Number(findIndex)]
        ?.name,
    )
    if(value === 'all-rooms') {
      mutateDataSeasonsByProperty()
    } else {
      mutateDataSeasonsByPropertyRoomType()
    }
  }
  return (
    <main className="flex flex-col gap-10 relative min-h-screen p-5">
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-gray-800">Season Calendar</h1>
        <p className="text-sm font-medium text-slate-600">
          Adjust Your Rates and Availability Anytime, Anywhere—Tailored to the
          Season.
        </p>
      </div>
      <section className="flex items-center gap-5">
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="view"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            View:
          </label>
          <select
            onChange={(e) => {
              handleSearchParams('view', e.target.value)
              setViewMode(e.target.value)
            }}
            name="view"
            value={viewMode}
            id="view"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="list-view">List View</option>
            <option value="monthly-view">Monthly View</option>
          </select>
        </span>
        
          <span className="w-fit flex gap-2 items-center">
            <label
              htmlFor="select-room"
              className="text-xs min-w-max font-bold text-gray-500"
            >
              Select room:
            </label>
            <select
              name="select-room"
              onChange={(e) => {
                const findPropertyRoomType = propertyRoomTypes.find((item: any) => Number(item?.id) === Number(e.target.value))
                setSelectedPropertyRoomType(findPropertyRoomType) 
                setSelectRoom((state) => {
                  state = e.target.value
                  return state
                })
                handleRoomName(e.target.value)
              }}
              defaultValue="all-rooms"
              id="select-room"
              className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 w-[250px] min-w-max focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all-rooms">All Rooms</option>
              {propertyRoomTypes?.map(
                (item: any, index: number) => {
                  return (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  )
                },
              )}
            </select>
          </span>
        {viewMode === 'list-view' && (
          <span className="w-fit flex gap-2 items-center">
            <label
              htmlFor="period"
              className="text-xs min-w-max font-bold text-gray-500"
            >
              Period:
            </label>
            <select
              name="period"
              onChange={(e) => {
                setMonth(Number(e.target.value.split('-')[0]))
                setYear(Number(e.target.value.split('-')[1]))
              }}
              defaultValue={`${month}-${year}`}
              id="period"
              className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Array.from({ length: 12 }).map((_, index) => {
                return (
                  <option value={`${index}-${year}`}>
                    {index + 1 < 10 ? '0' + (index + 1) : index + 1} - {year}
                  </option>
                )
              })}
            </select>
          </span>
        )}
      </section>
      {viewMode === 'list-view' &&
        dataSeasonsByProperty?.property?.propertyRoomType?.map(
          (item: any, index: number) => {
            return (
              <section className="flex flex-col gap-5">
                <hgroup className="text-xl font-bold text-gray-900 flex flex-col">
                  <h1>{item?.name}</h1>
                  <p className="text-sm font-medium text-gray-500">
                    {dataSeasonsByProperty?.property?.name}
                  </p>
                </hgroup>
                <Separator />
                <div className="overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
                  <div className="overflow-hidden flex items-center w-fit bg-white">
                    <div className="flex flex-col border-2 border-white rounded-2xl overflow-hidden bg-slate-600">
                      <div className=" bg-gray-800 text-white justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]">
                        <span className="flex items-center gap-1.5">
                          <FaRegCalendar className="text-gray-50" size={18} />
                          Month {month + 1 < 10 ? '0' + (month + 1) : month + 1}
                          -{year}
                        </span>
                      </div>
                      <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
                        <span className="flex items-center gap-1.5">
                          <FaCheck className="text-emerald-100" size={18} />
                          Status
                        </span>
                      </div>
                      <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[65px]">
                        <span className="flex items-center gap-1.5">
                          <MdOutlineSell className="text-gray-100" size={18} />
                          Rooms to sell
                        </span>
                        <div className="text-blue-100 hover:opacity-75 hover:cursor-pointer active:underline transition duration-100">
                          (Ready to rent)
                        </div>
                      </div>
                      <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
                        <span className="flex items-center gap-1.5">
                          <BsCurrencyDollar
                            className="text-green-100"
                            size={18}
                          />
                          Rates
                        </span>
                      </div>
                    </div>
                    {Array.from({
                      length: new Date(year, month, 0).getDate(),
                    }).map((_: any, index: number) => {
                      const today = new Date(year, month, new Date().getDate())
                      const seasonIdx =
                        dataSeasonsByProperty?.seasons?.findIndex(
                          (season: any) =>
                            season?.date ===
                              addHours(
                                new Date(year, month, index + 1),
                                7,
                              ).toISOString() &&
                            season?.propertyRoomTypeId === item?.id,
                        )
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (
                              isBefore(
                                new Date(),
                                new Date(year, month, index + 1),
                              )
                            ) {
                              mutateGetSeasonalPrice({
                                propertyRoomTypeId: Number(item?.id),
                                date: new Date(year, month, index + 1),
                              })
                              setActiveRoomSetter({
                                startDate: new Date(year, month, index + 2),
                                endDate: new Date(year, month, index + 2),
                                name: item?.name,
                              })
                              setDataPropertyRoomTypeSeason((state: any) => {
                                state.startDate = new Date(year, month, index + 2).toISOString()
                                state.endDate = new Date(year, month, index + 2).toISOString()
                                return state
                              })
                              setChangeDate((state) => !state)
                            }
                          }}
                          className={`${seasonIdx <= -1 ? 'bg-slate-100' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-slate-100' : 'bg-red-200'} rounded-2xl overflow-hidden flex flex-col   ${isBefore(new Date(year, month, index + 1), new Date()) ? 'hover:cursor-not-allowed opacity-60 hover:border-white' : 'hover:cursor-pointer hover:border-amber-400 active:border-blue-400'}border-white border-2 active:border-2  transition duration-75`}
                        >
                          <div className=" bg-gray-800 text-white flex items-center justify-between p-2 text-sm font-bold w-[85px]  gap-2 h-[45px]">
                            <div>
                              {seasonIdx <= -1 ? (
                                ''
                              ) : dataSeasonsByProperty?.seasons[seasonIdx]
                                  ?.isPeak ? (
                                <FaFire className="text-amber-400 text-lg" />
                              ) : (
                                ''
                              )}
                            </div>
                            {index + 1}
                          </div>
                          <div className="  justify-center p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[45px]">
                            <div
                              className={`h-[70%] w-full ${seasonIdx <= -1 ? 'bg-green-300 text-green-800' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}
                                 opacity-65 rounded-full text-xs flex items-center justify-center `}
                            >
                              {seasonIdx <= -1
                                ? 'Open'
                                : dataSeasonsByProperty?.seasons[seasonIdx]
                                      ?.roomAvailability
                                  ? 'Open'
                                  : 'Closed'}
                            </div>
                          </div>
                          <div className={`  justify-center items-end p-2 text-base font-light ${seasonIdx <= -1 ? 'text-gray-800' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'text-gray-800' : 'text-transparent'}  w-[85px] flex flex-col gap-2 h-[65px]`}>
                            {seasonIdx > -1
                              ? dataSeasonsByProperty?.seasons[seasonIdx]
                                  ?.roomToRent
                              : item?.totalRooms}
                          </div>
                          <div className={`  justify-center items-end p-2 text-sm font-medium ${seasonIdx <= -1 ? 'text-gray-600' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'text-gray-600' : 'text-transparent'} w-full flex flex-col gap-2 h-[45px]`}>
                            <span className="flex items-center">
                              {seasonIdx > -1
                                ? Number(
                                    dataSeasonsByProperty?.seasons[seasonIdx]
                                      ?.price,
                                  ) > 100000
                                  ? Number(
                                      dataSeasonsByProperty?.seasons[seasonIdx]
                                        ?.price / 1000000,
                                    )
                                      .toFixed(1)
                                      .toString() + 'M'
                                  : Number(
                                      dataSeasonsByProperty?.seasons[seasonIdx]
                                        ?.price,
                                    )
                                      .toString()
                                      .slice(0, -3) + 'K'
                                : Number(item?.price) > 100000
                                  ? Number(item?.price / 1000000)
                                      .toFixed(1)
                                      .toString() + 'M'
                                  : Number(item?.price)
                                      .toString()
                                      .slice(0, -3) + 'K'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          },
        )}
      {viewMode === 'monthly-view' && (
        <div className="w-full flex flex-col gap-5">
          <hgroup className="text-xl font-bold text-gray-900 flex items-center gap-1">
            <h1 className=" flex items-center gap-1">
              {selectRoom === 'all-rooms'
                ? dataSeasonsByProperty?.property?.name + ' Property'
                : selectedPropertyRoomType?.name + ' Room Type'}
            </h1>
          </hgroup>
          <div className="w-full flex items-center">
            <Calendar
              onSelect={(date) => {
                let seasonStartDate: any
                let seasonEndDate: any
                let seasonId: any
                let seasonName: any
                let seasonRatesPercentage: any
                let seasonIsPeak: any
                let seasonAvailability: any
                let seasonRoomToRent: any
                let seasonBasePrice: any
                let
                isBulk: false, seasonRoomTypeTotalRooms: any
                dataSeasonsByProperty?.propertySeasons?.forEach(
                  (seasonalPrice: any, index: number) => {
                    const getIndex = seasonalPrice?.seasonalPrice?.findIndex(
                      (season: any) =>
                        season?.date === addHours(date, 7).toISOString() &&
                        season?.propertyId ===
                          dataSeasonsByProperty?.property?.id,
                    )
                    if (getIndex > -1) {
                      seasonStartDate = seasonalPrice?.startDate
                      seasonEndDate = seasonalPrice?.endDate
                      seasonId = seasonalPrice?.id
                      seasonName = seasonalPrice?.name
                      seasonRatesPercentage = seasonalPrice?.ratesPercentage
                      seasonIsPeak = seasonalPrice?.isPeak
                      seasonRoomToRent = seasonalPrice?.roomToRent
                      seasonAvailability = seasonalPrice?.roomAvailability
                      seasonBasePrice = seasonalPrice?.basePrice
                      seasonRoomTypeTotalRooms = seasonalPrice?.totalRooms
                    }
                  },
                )
                if (seasonId) {
                  if(selectRoom === 'all-rooms') {
                    setDataBulkSeason({
                      pricePercentage: seasonRatesPercentage,
                      availability: seasonAvailability,
                      name: seasonName,
                      seasonId: seasonId,
                      startDate: seasonStartDate,
                      endDate: seasonEndDate,
                      isPeak: seasonIsPeak,
                    })
                  } else {
                    mutateGetSeasonalPriceByRoomType({startDate:seasonStartDate, endDate:seasonEndDate, seasonId })
                  }
                } else {
                  handleDateRange(addHours(date, 7))
                }
                setChangeDate((state) => !state)
                
              }}
              cellClassName={(date) => {
                let rangeDateArr: any[] = []
                if (dateRange?.endDate && dateRange?.startDate) {
                  rangeDateArr = Array.from({
                    length:
                      differenceInDays(
                        dateRange?.endDate,
                        dateRange?.startDate,
                      ) + 1,
                  }).map((_, index) => {
                    return addDays(
                      dateRange?.startDate as string,
                      index,
                    ).toISOString()
                  })
                }

                if (isBefore(date, new Date())) {
                  return 'bg-gray-200 active:outline-none active:border-none active:ring-0 hover:cursor-not-allowed hover:bg-gray-200 active:cursor-not-allowed text-gray-500'
                } else if (
                  rangeDateArr.length > 0 &&
                  rangeDateArr.includes(
                    new Date(addHours(date, 7)).toISOString(),
                  )
                ) {
                  return 'bg-blue-300 text-gray-900'
                }
                return ''
              }}
              renderCell={(date) => {
                const seasonIdxHighestPrice =
                  dataSeasonsByProperty?.seasons?.findIndex(
                    (season: any) =>
                      season?.date === addHours(date, 7).toISOString() &&
                      season?.propertyRoomTypeId ===
                        dataSeasonsByProperty?.property?.propertyRoomType[
                          dataSeasonsByProperty?.property?.propertyRoomType
                            .length - 1
                        ]?.id,
                  )
                const seasonIdxLowestPrice =
                  dataSeasonsByProperty?.seasons?.findIndex(
                    (season: any) =>
                      season?.date === addHours(date, 7).toISOString() &&
                      season?.propertyRoomTypeId ===
                        dataSeasonsByProperty?.property?.propertyRoomType[0]
                          ?.id,
                  )
                let seasonalPriceIdxPropertySeason
                let seasonIdxPropertySeason = -1
                let isStartSeason
                let isEndSeason
                let isAvailable
                let seasonStartDate: any
                let seasonEndDate: any
                let seasonId: any
                dataSeasonsByProperty?.propertySeasons?.forEach(
                  (seasonalPrice: any, index: number) => {
                    const getIndex = seasonalPrice?.seasonalPrice?.findIndex(
                      (season: any) =>
                        season?.date === addHours(date, 7).toISOString() &&
                        season?.propertyId ===
                          dataSeasonsByProperty?.property?.id,
                    )
                    if (getIndex > -1) {
                      seasonalPriceIdxPropertySeason = getIndex
                      seasonIdxPropertySeason = index
                      isEndSeason =
                        seasonalPrice?.seasonalPrice[getIndex]?.isEndSeason
                      isStartSeason =
                        seasonalPrice?.seasonalPrice[getIndex]?.isStartSeason
                      isAvailable =
                        seasonalPrice?.seasonalPrice[getIndex]?.roomAvailability
                      seasonStartDate = seasonalPrice?.startDate
                      seasonEndDate = seasonalPrice?.endDate
                      seasonId = seasonalPrice?.id
                    }
                  },
                )

                let highestPrice =
                  dataSeasonsByProperty?.property?.propertyRoomType[
                    dataSeasonsByProperty?.property?.propertyRoomType.length - 1
                  ]?.price
                let lowestPrice =
                  dataSeasonsByProperty?.property?.propertyRoomType[0]?.price
                let isPropertyHasSeason = false
                let isRoomHasSeason = false
                if (seasonIdxHighestPrice > -1) {
                  highestPrice =
                    dataSeasonsByProperty?.seasons[seasonIdxHighestPrice]?.price
                }
                if (seasonIdxLowestPrice > -1) {
                  lowestPrice =
                    dataSeasonsByProperty?.seasons[seasonIdxLowestPrice]?.price
                }
                let roomPrice = 0
                if (selectRoom !== 'all-rooms') {
                  const findRoomIdx =
                    dataSeasonsByProperty?.property?.propertyRoomType.findIndex(
                      (room: any) => Number(room?.id) === Number(selectRoom),
                    )
                  roomPrice =
                    dataSeasonsByProperty?.property?.propertyRoomType[
                      findRoomIdx
                    ]?.price
                  const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex(
                    (season: any) =>
                      season?.date === addHours(date, 7).toISOString() &&
                      Number(season?.propertyRoomTypeId) === Number(selectRoom),
                  )
                  if (seasonIdx > -1) {
                    roomPrice = dataSeasonsByProperty?.seasons[seasonIdx]?.price
                    isStartSeason =
                      dataSeasonsByProperty?.seasons[seasonIdx]?.isStartSeason
                    isEndSeason =
                      dataSeasonsByProperty?.seasons[seasonIdx]?.isEndSeason
                  }
                }
                const seasonName =
                  dataSeasonsByProperty?.propertySeasons[
                    seasonIdxPropertySeason
                  ]?.name
                return (
                  <div className="w-full h-fit flex flex-col items-center justify-center text-xs font-medium text-gray-500">
                    {isStartSeason && isEndSeason && seasonName && (
                      <div className="mt-[2px] px-5 w-full">
                        <div
                          className={`py-[2px] px-1 relative w-full rounded-full text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
                        >
                          {
                            dataSeasonsByProperty?.propertySeasons[
                              seasonIdxPropertySeason
                            ]?.name
                          }
                        </div>
                      </div>
                    )}
                    {isStartSeason && !isEndSeason && seasonName && (
                      <div
                        className={`mt-[2px] py-[2px] px-6 relative left-[30px]  text-left rounded-l-full w-[calc(100%+10px)] text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
                      >
                        {
                          dataSeasonsByProperty?.propertySeasons[
                            seasonIdxPropertySeason
                          ]?.name
                        }
                      </div>
                    )}
                    {!isStartSeason && isEndSeason && seasonName && (
                      <div
                        className={`mt-[2px] text-transparent py-[2px] px-1 relative right-[30px] rounded-r-full w-[calc(100%+10px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
                      >
                        {
                          dataSeasonsByProperty?.propertySeasons[
                            seasonIdxPropertySeason
                          ]?.name
                        }
                      </div>
                    )}
                    {!isStartSeason && !isEndSeason && seasonName && (
                      <div
                        className={`mt-[2px] text-transparent py-[2px] px-1 relative w-[calc(100%+20px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}
                      >
                        {
                          dataSeasonsByProperty?.propertySeasons[
                            seasonIdxPropertySeason
                          ]?.name
                        }
                      </div>
                    )}

                    {selectRoom === 'all-rooms' ? (
                      <div className="w-full h-fit flex items-center justify-center p-1.5">
                        <p>
                          {Number(lowestPrice) > 100000
                            ? Number(lowestPrice / 1000000)
                                .toFixed(1)
                                .toString() + 'M'
                            : Number(lowestPrice).toString().slice(0, -3) + 'K'}
                        </p>
                        <p>-</p>
                        <p>
                          {Number(highestPrice) > 100000
                            ? Number(highestPrice / 1000000)
                                .toFixed(1)
                                .toString() + 'M'
                            : Number(highestPrice).toString().slice(0, -3) +
                              'K'}
                        </p>
                      </div>
                    ) : (
                      <p>
                        {Number(roomPrice) > 100000
                          ? Number(roomPrice / 1000000)
                              .toFixed(1)
                              .toString() + 'M'
                          : Number(roomPrice).toString().slice(0, -3) + 'K'}
                      </p>
                    )}
                  </div>
                )
              }}
            />
          </div>
        </div>
      )}
      <section
        className={`${(activeRoomSetter?.startDate && !isPendingGetSeasonalPrice ) || (dataPropertyRoomTypeSeason?.startDate && dataPropertyRoomTypeSeason?.endDate  ) || dataPropertyRoomTypeSeason?.isBulk ? 'flex' : 'hidden'} w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51]`}
      >
        <div className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]">
            <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
              <h1>{activeRoomSetter?.name || selectedPropertyRoomType?.name} Type</h1>
              {
                !dataPropertyRoomTypeSeason?.isBulk ? (
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  {
                  dataPropertyRoomTypeSeason?.startDate && (
                    dataPropertyRoomTypeSeason?.startDate
                      // .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-')
                      )}
                </p>
                ) : (

                <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                  {dataPropertyRoomTypeSeason?.startDate &&
                    dataPropertyRoomTypeSeason?.startDate
                      // .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-')}
                  {dataPropertyRoomTypeSeason?.endDate &&
                    dataPropertyRoomTypeSeason?.endDate !== dataPropertyRoomTypeSeason?.startDate &&
                    ' until ' +
                      dataPropertyRoomTypeSeason?.endDate
                        // .toISOString()  
                        .split('T')[0]
                        .split('-')
                        .reverse()
                        .join('-')}
                </p>
                )
              }
            </hgroup>
          
          <Separator />
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="oneDaySeasonName"
                className="text-sm font-bold text-black ml-5"
              >
                Season Name
              </label>
              <input
                id="oneDaySeasonName"
                onChange={(e) => {
                  setDataPropertyRoomTypeSeason((state: any) => {
                    state.name = e.target.value
                    return state
                  })
                  setChangeDate((state) => !state)
                }}
                value={dataPropertyRoomTypeSeason.name}
                name="oneDaySeasonName"
                type="text"
                placeholder="Eid al-fitr "
                className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                name="isEditRateByPercentage"
                checked={isEditRateByPercentage}
                onCheckedChange={(e) => {
                  if (e) {
                    setIsEditRateByPercentage(true)
                    setChangeDate((state) => !state)
                  } else {
                    setIsEditRateByPercentage(false)
                    setChangeDate((state) => !state)
                  }
                }}
                className="ml-5"
              />
              <label
                htmlFor="isEditRateByPercentage"
                className="text-sm font-bold text-black"
              >
                Edit Rates By Percentage
              </label>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="w-full text-xs text-gray-600 bg-slate-300 rounded-full px-2 flex justify-center py-1 font-bold">
                Default: Rp{dataPropertyRoomTypeSeason?.basePrice}
              </div>
              {isEditRateByPercentage && (
                <div className="w-full text-xs text-gray-600 bg-slate-300 rounded-full px-2 flex justify-center py-1 font-bold">
                  New: Rp{dataPropertyRoomTypeSeason?.roomPrices || dataPropertyRoomTypeSeason?.basePrice}
                </div>
              )}
            </div>
            {!isEditRateByPercentage && !(viewMode === 'monthly-view' && selectRoom === 'all-rooms') ? (
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="oneDaySeasonRoomPrice"
                  className="text-sm font-bold text-black ml-5"
                >
                  Rates
                </label>
                <input
                  id="oneDaySeasonRoomPrice"
                  onChange={(e) => {
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomPrices = Number(e.target.value)
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                  value={dataPropertyRoomTypeSeason.roomPrices}
                  name="oneDaySeasonRoomPrice"
                  type="number"
                  placeholder="Rp500000"
                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="oneDaySeasonRoomPricePercentage"
                  className="text-sm font-bold text-black ml-5"
                >
                  Rates Percentage (%)
                </label>
                {
                  dataPropertyRoomTypeSeason.isBulk ? (
                <div className="flex items-center gap-3 w-full justify-center ">
                  <div
                    className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                    onClick={() => {
                      let getPercent: number = Number(Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0))
                      getPercent -= 5
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(getPercent) / 100) * state.basePrice,
                        ).toFixed(0)
                        state.pricePercentage = Number(getPercent).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                      console.log(dataPropertyRoomTypeSeason)
                    }}
                  >
                    -
                  </div>
                  <input
                    value={Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0)}
                    onChange={(e) => {
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(e.target.value) / 100) * state.basePrice,
                        ).toFixed(0)
                        state.pricePercentage = Number(e.target.value).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                    }}
                    id="oneDaySeasonRoomPricePercentage"
                    min={0}
                    name="oneDaySeasonRoomPricePercentage"
                    type="number"
                    placeholder="100"
                    className="text-center placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                  />
                  <div
                    className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                    onClick={() => {
                      let getPercent: number = Number(Number(dataPropertyRoomTypeSeason.pricePercentage).toFixed(0))
                      getPercent += 5
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(getPercent) / 100) * state.basePrice,
                        ).toFixed(0)
                        state.pricePercentage = Number(getPercent).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                    }}
                  >
                    +
                  </div>
                </div>
                  ) : (
                <div className="flex items-center gap-3 w-full justify-center ">
                  <div
                    className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                    onClick={() => {
                      let getPercent: number = Number(
                        Number(
                          (dataPropertyRoomTypeSeason.roomPrices /
                            dataPropertyRoomTypeSeason.basePrice) *
                            100,
                        ).toFixed(0),
                      )
                      getPercent -= 5
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(getPercent) / 100) * state.basePrice,
                        ).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                    }}
                  >
                    -
                  </div>
                  <input
                    value={Number(
                      (dataPropertyRoomTypeSeason.roomPrices /
                        dataPropertyRoomTypeSeason.basePrice) *
                        100,
                    ).toFixed(0)}
                    onChange={(e) => {
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(e.target.value) / 100) * state.basePrice,
                        ).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                    }}
                    id="oneDaySeasonRoomPricePercentage"
                    min={0}
                    name="oneDaySeasonRoomPricePercentage"
                    type="number"
                    placeholder="100"
                    className="text-center placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                  />
                  <div
                    className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                    onClick={() => {
                      let getPercent: number = Number(
                        Number(
                          (dataPropertyRoomTypeSeason.roomPrices /
                            dataPropertyRoomTypeSeason.basePrice) *
                            100,
                        ).toFixed(0),
                      )
                      getPercent += 5
                      setDataPropertyRoomTypeSeason((state: any) => {
                        state.roomPrices = Number(
                          (Number(getPercent) / 100) * state.basePrice,
                        ).toFixed(0)
                        return state
                      })
                      setChangeDate((state) => !state)
                    }}
                  >
                    +
                  </div>
                </div>
                  )
                }
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Checkbox
                name="oneDaySeasonRoomAvailability"
                checked={dataPropertyRoomTypeSeason.availability}
                onCheckedChange={(e) => {
                  setDataPropertyRoomTypeSeason((state: any) => {
                    state.availability = e
                    return state
                  })
                  setChangeDate((state) => !state)
                }}
                className="ml-5"
              />
              <label
                htmlFor="oneDaySeasonRoomAvailability"
                className="text-sm font-bold text-black"
              >
                Room available
              </label>
            </div>
            {viewMode === 'list-view' || selectRoom !== 'all-rooms' && (
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="oneDaySeasonRoomToRent"
                  className="text-sm font-bold text-black ml-5"
                >
                  Rooms to sell
                </label>
                <input
                  disabled={!dataPropertyRoomTypeSeason.availability}
                  id="oneDaySeasonRoomToRent"
                  name="oneDaySeasonRoomToRent"
                  onChange={(e) => {
                    setDataPropertyRoomTypeSeason((state: any) => {
                      state.roomsToSell = Number(e.target.value)
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                  max={dataPropertyRoomTypeSeason?.totalRooms}
                  value={dataPropertyRoomTypeSeason?.roomsToSell}
                  type="number"
                  placeholder="30 Rooms"
                  className={`${!dataPropertyRoomTypeSeason.availability ? 'text-gray-400' : 'text-gray-900'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
                />
              </div>
            )}
          </section>
          <div className="flex items-center gap-1.5">
            <Checkbox
              name="oneDaySeasonIsPeak"
              checked={dataPropertyRoomTypeSeason.isPeak}
              onCheckedChange={(e) => {
                setDataPropertyRoomTypeSeason((state: any) => {
                  state.isPeak = e
                  return state
                })
                setChangeDate((state) => !state)
              }}
              className="ml-5"
            />
            <label
              htmlFor="oneDaySeasonIsPeak"
              className="text-sm font-bold text-black"
            >
              Peak of the season
            </label>
          </div>
          <div className="flex items-center gap-2 justify-end mt-4">
            <button
              onClick={() => {
                setActiveRoomSetter({
                  startDate: '',
                  endDate: '',
                  name: '',
                })
                setDataPropertyRoomTypeSeason({
                  basePrice: 0,
                  isBulk: false,
                  roomPrices: 0,
                  roomsToSell: 0,
                  totalRooms: 0,
                  availability: true,
                  propertyRoomTypeId: 0,
                  name: '',
                  seasonId: '',
                  seasonalPriceId: '',
                  startDate: '',
                  endDate: '',
                  isPeak: false,
                })
                setDateRange({
                  startDate: null,
                  endDate: null,
                })
              }}
              
              className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md"
              type="button"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!dataPropertyRoomTypeSeason?.name}
              onClick={() => {
                if(dataPropertyRoomTypeSeason?.isBulk) {
                  if (dataPropertyRoomTypeSeason?.seasonId) {
                    mutateUpdateSingleSeason()
                  } else {
                    mutateCreateOneSeason()
                  }
                } else {
                  if (dataPropertyRoomTypeSeason?.seasonId) {
                    mutateUpdateSeason()
                  } else {
                    mutateCreateSeason()
                  }
                }
              }}
              className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md"
            >
              Save
            </button>
          </div>
          {dataPropertyRoomTypeSeason?.seasonId && (
            <button
              type="button"
              onClick={() => {
                if(viewMode === 'monthly-view') {
                  mutateDeleteSingleSeason()
                } else {
                  mutateDeleteSeason()
                }
              }}
              disabled={isPendingDeleteSeason}
              className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-red-700 text-white shadow-md"
            >
              Delete Season
            </button>
          )}
        </div>
      </section>
      <section
        className={`${dataBulkSeason?.startDate && dataBulkSeason?.endDate ? 'flex' : 'hidden'} w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51]`}
      >
        <div className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]">
          {viewMode === 'monthly-view' && (
            <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
              <h1>{roomName ? roomName + ' Type' : 'All Room Types'}</h1>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                {dataBulkSeason?.startDate &&
                  dataBulkSeason?.startDate
                    .split('T')[0]
                    .split('-')
                    .reverse()
                    .join('-')}
                {dataBulkSeason?.endDate &&
                  dataBulkSeason?.endDate !== dataBulkSeason?.startDate &&
                  ' until ' +
                    dataBulkSeason?.endDate
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-')}
              </p>
            </hgroup>
          )}

          <Separator />
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="bulkSeasonName"
                className="text-sm font-bold text-black ml-5"
              >
                Season Name
              </label>
              <input
                id="bulkSeasonName"
                onChange={(e) => {
                  setDataBulkSeason((state: any) => {
                    state.name = e.target.value
                    return state
                  })
                  setChangeDate((state) => !state)
                }}
                value={dataBulkSeason.name}
                name="bulkSeasonName"
                type="text"
                placeholder="Eid al-fitr "
                className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="bulkSeasonRoomPricePercentage"
                className="text-sm font-bold text-black ml-5"
              >
                Rates Percentage (%)
              </label>
              <div className="flex items-center gap-3 w-full justify-center ">
                <div
                  className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                  onClick={() => {
                    setDataBulkSeason((state: any) => {
                      state.pricePercentage -= 5
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                >
                  -
                </div>
                <input
                  value={Number(dataBulkSeason.pricePercentage)}
                  onChange={(e) => {
                    setDataBulkSeason((state: any) => {
                      state.pricePercentage = Number(e.target.value)
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                  id="bulkSeasonRoomPricePercentage"
                  min={0}
                  name="bulkSeasonRoomPricePercentage"
                  type="number"
                  placeholder="100"
                  className="text-center placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                />
                <div
                  className="h-8 w-8 flex items-center justify-center text-sm font-bold text-white rounded-full hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-100 bg-slate-900"
                  onClick={() => {
                    setDataBulkSeason((state: any) => {
                      state.pricePercentage += 5
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                >
                  +
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                name="bulkSeasonRoomAvailability"
                checked={dataBulkSeason.availability}
                onCheckedChange={(e) => {
                  setDataBulkSeason((state: any) => {
                    state.availability = e
                    return state
                  })
                  setChangeDate((state) => !state)
                }}
                className="ml-5"
              />
              <label
                htmlFor="bulkSeasonRoomAvailability"
                className="text-sm font-bold text-black"
              >
                Room available
              </label>
            </div>
            {viewMode === 'list-view' && (
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="bulkSeasonRoomToRent"
                  className="text-sm font-bold text-black ml-5"
                >
                  Rooms to sell
                </label>
                <input
                  disabled={!dataBulkSeason.availability}
                  id="bulkSeasonRoomToRent"
                  name="bulkSeasonRoomToRent"
                  onChange={(e) => {
                    setDataBulkSeason((state: any) => {
                      state.roomsToSell = Number(e.target.value)
                      return state
                    })
                    setChangeDate((state) => !state)
                  }}
                  max={dataBulkSeason?.totalRooms}
                  value={dataBulkSeason?.roomsToSell}
                  type="number"
                  placeholder="30 Rooms"
                  className={`${!dataBulkSeason.availability ? 'text-gray-400' : 'text-gray-900'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
                />
              </div>
            )}
          </section>
          <div className="flex items-center gap-1.5">
            <Checkbox
              name="bulkSeasonIsPeak"
              checked={dataBulkSeason.isPeak}
              onCheckedChange={(e) => {
                setDataBulkSeason((state: any) => {
                  state.isPeak = e
                  return state
                })
                setChangeDate((state) => !state)
              }}
              className="ml-5"
            />
            <label
              htmlFor="bulkSeasonIsPeak"
              className="text-sm font-bold text-black"
            >
              Peak of the season
            </label>
          </div>
          <div className="flex items-center gap-2 justify-end mt-4">
            <button
              onClick={() => {
                setDataBulkSeason({
                  pricePercentage: 100,
                  availability: true,
                  name: '',
                  seasonId: '',
                  startDate: '',
                  endDate: '',
                  isPeak: false,
                })
                setDateRange({
                  startDate: null,
                  endDate: null,
                })
              }}
              className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md"
              type="button"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!dataBulkSeason?.name}
              onClick={() => {
                if (dataBulkSeason?.seasonId) {
                  mutateUpdatePropertySeason()
                } else {
                  mutateCreatePropertySeason()
                }
              }}
              className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md"
            >
              Save
            </button>
          </div>
          {dataBulkSeason?.seasonId && (
            <button
              type="button"
              onClick={() => {
                mutateDeletePropertySeason()
              }}
              disabled={isPendingDeletePropertySeason}
              className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-red-700 text-white shadow-md"
            >
              Delete Season
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default CalendarPage
