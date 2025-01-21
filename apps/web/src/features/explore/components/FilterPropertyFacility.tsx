'use client'

import React from 'react'

const FilterPropertyFacility = ({
  dataForFilteringProperty,
  setShowFilterPropertyFacility,
  showFilterPropertyFacility,
  handlePropertyFacilityFilter,
}: any) => {
  return (
    <div
      tabIndex={0}
      className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
    >
      <input type="checkbox" />
      <div className="collapse-title text-sm font-bold text-gray-800 flex items-center gap-1 bg-white">
        Public Facility
        <span className="rounded-full bg-slate-200 text-slate-700 text-xs h-[1.5em] w-[1.5em] flex items-center justify-center">
          {dataForFilteringProperty?.propertyFacilityCounter}
        </span>
      </div>
      <div className="collapse-content pt-3">
        <div className="overflow-y-auto scrollbar-thin max-h-[250px]">
          <ul className="flex flex-col gap-4 text-sm font-semibold">
            {dataForFilteringProperty?.propertyFacility
              .slice(0, 5)
              .map((item: any, index: number) => {
                return (
                  <li key={index} className="form-control">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        value={item?.id}
                        onChange={(e) =>
                          handlePropertyFacilityFilter(
                            e.target.checked,
                            e.target.value,
                          )
                        }
                        type="checkbox"
                        className="checkbox"
                      />
                      <span className="text-gray-600 label-text">
                        {item?.name}
                      </span>
                    </label>
                  </li>
                )
              })}
            {!showFilterPropertyFacility ? (
              <li
                onClick={() => setShowFilterPropertyFacility(true)}
                className={`${dataForFilteringProperty?.propertyFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
              >
                Show more...
              </li>
            ) : (
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {dataForFilteringProperty?.propertyFacility
                  .slice(5)
                  .map((item: any, index: number) => {
                    return (
                      <li key={index} className="form-control">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            onChange={(e) =>
                              handlePropertyFacilityFilter(
                                e.target.checked,
                                e.target.value,
                              )
                            }
                            value={item?.id}
                            type="checkbox"
                            className="checkbox"
                          />
                          <span className="text-gray-600 label-text">
                            {item?.name}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                <li
                  onClick={() => setShowFilterPropertyFacility(false)}
                  className={`${dataForFilteringProperty?.propertyFacility.length <= 5 && 'hidden'} hover:cursor-pointer text-blue-600 hover:underline hover:text-blue-700 transition duration-100`}
                >
                  Show less
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FilterPropertyFacility
