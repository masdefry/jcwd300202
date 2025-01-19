import { LucideShowerHead } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { MdOutlineMeetingRoom, MdPeopleOutline } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'

const DataRoomDetails = ( {showDataRoom, setShowDataRoom, currSlideRoomImages, nextRoomImage, prevRoomImage}: {showDataRoom: any, setShowDataRoom: any, currSlideRoomImages: any, nextRoomImage: ({roomImagesLength}: {roomImagesLength: number}) => void, prevRoomImage: ({roomImagesLength}: {roomImagesLength: number}) => void,}) => {
  return (
    <section className="fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[53] flex items-center justify-center px-5">
      <div className="bg-white rounded-lg shadow-md p-5 h-[600px] max-w-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 my-5 scrollbar-track-transparent">
        <div className="flex flex-col gap-5">
          <div className="text-gray-950 text-lg w-full flex justify-end">
            <RiCloseFill
              onClick={() =>
                setShowDataRoom({
                  roomImages: [],
                  roomHasFacilities: [],
                  name: '',
                  description: '',
                  rooms: 0,
                  capacity: 0,
                  bathrooms: 0,
                  price: 0,
                })
              }
              className="hover:opacity-60 transition duration-100 hover:cursor-pointer"
            />
          </div>
          <div className="h-[300px] w-full bg-slate-200 rounded-md relative overflow-hidden">
            <div
              className={`flex items-center h-full min-w-max transition-transform ease-in-out duration-1000`}
              style={{
                transform: `translateX(-${(currSlideRoomImages / showDataRoom?.roomImages.length) * 100}%)`,
              }}
            >
              {showDataRoom?.roomImages.map((itm: any, idx: number) => {
                return (
                  <figure className={`min-w-max h-full`} key={idx}>
                    <Image
                      src={`http://localhost:5000/api/${itm?.directory}/${itm?.filename}.${itm?.fileExtension}`}
                      width={600}
                      height={500}
                      alt=""
                      className="h-full min-w-max object-cover"
                    />
                  </figure>
                )
              })}
            </div>

            <div className="text-gray-600 text-lg absolute top-0 h-full flex items-center right-3">
              <div
                onClick={() =>
                  nextRoomImage({
                    roomImagesLength: showDataRoom?.roomImages?.length,
                  })
                }
                className="rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90"
              >
                <IoIosArrowForward />
              </div>
            </div>
            <div className="text-gray-600 text-lg absolute top-0 h-full flex items-center left-3">
              <div
                onClick={() =>
                  prevRoomImage({
                    roomImagesLength: showDataRoom?.roomImages?.length,
                  })
                }
                className="rounded-full bg-white p-2 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90"
              >
                <IoIosArrowBack />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-white font-bold text-lg p-3 rounded-md bg-slate-900">
              {showDataRoom?.name}
            </h1>
            <p className="text-sm font-medium text-gray-600 text-justify">
              {showDataRoom?.description}
            </p>
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-bold text-gray-900">Room Facility</h1>
              <div className="grid grid-cols-2 2xl:grid-cols-3 gap-2">
                {showDataRoom?.roomHasFacilities?.map(
                  (itm: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="flex sm:text-sm font-medium text-slate-800 text-xs tracking-wide items-center gap-2"
                      >
                        <figure>
                          <Image
                            src={`http://localhost:5000/api/${itm?.propertyRoomFacility?.iconDirectory}/${itm?.propertyRoomFacility?.iconFilename}.${itm?.propertyRoomFacility?.iconFileExtension}`}
                            width={100}
                            height={100}
                            alt=""
                            className="h-4 w-4"
                          />
                        </figure>
                        <p>{itm?.propertyRoomFacility?.name}</p>
                      </div>
                    )
                  },
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <MdPeopleOutline className="text-md" />
                <p className="font-bold">Capacity</p>
                <p>{showDataRoom?.capacity}</p>
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <MdOutlineMeetingRoom className="text-md" />
                <p className="font-bold">Rooms</p>
                <p>{showDataRoom?.rooms || 1}</p>
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <LucideShowerHead className="text-md" />
                <p className="font-bold">Bathrooms</p>
                <p>{showDataRoom?.bathrooms}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataRoomDetails
