'use client'

import React from 'react'
import { FaStar } from 'react-icons/fa6'

const FilterStar = ({
  dataForFilteringProperty,
  handlePropertyStarFilter,
}: any) => {
  return (
    <div
      tabIndex={0}
      className="2xl:rounded-md rounded-none collapse collapse-arrow 2xl:shadow-md 2xl:border-t-0 border-t border-slate-300"
    >
      <input type="checkbox" />
      <div className="collapse-title text-sm font-bold text-gray-800 bg-white">
        Hotel Stars
      </div>
      <div className="collapse-content pt-3">
        <ul className="flex flex-col gap-4 text-sm font-semibold">
          {Array.from({ length: 4 }).map((item, index: number) => {
            return (
              <li key={index} className="form-control">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    value={5 - index}
                    onChange={(e) =>
                      handlePropertyStarFilter(e.target.checked, e.target.value)
                    }
                    type="checkbox"
                    className="checkbox"
                  />
                  <span className="text-gray-600 label-text flex items-center gap-1.5">
                    <p>{5 - index}</p>
                    <FaStar key={index} size={18} className="text-yellow-400" />
                    <p>
                      {dataForFilteringProperty?.countPropertyWithStar
                        ?.toString()
                        .split(',')
                        .join('')[index] || 0}
                    </p>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default FilterStar
