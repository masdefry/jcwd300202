'use client'

import React from 'react'
import { RangeSlider } from 'rsuite'
import 'rsuite/RangeSlider/styles/index.css'
const FilterPrice = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handlePrice,
  handlePriceFilterSubmit,
  mutateExploreFilterAndSort,
}: any) => {
  return (
    <div
      className="2xl:rounded-md w-full 2xl:shadow-md flex flex-col overflow-hidden bg-white"
      id="price-filter"
    >
      <hgroup className="flex flex-col gap-1.5 text-sm font-bold py-3 px-5 bg-gray-800 text-white">
        <h1>Price</h1>
        <p className="font-light text-gray-300">Get the best deal</p>
      </hgroup>
      <div className="flex flex-col gap-1 p-5">
        <RangeSlider
          value={[minPrice / 100000, maxPrice / 100000]}
          onChange={(value) => {
            setMinPrice(value[0] * 100000)
            setMaxPrice(value[1] * 100000)
          }}
          renderTooltip={(value) => (
            <div className="font-bold text-xs">{value && value * 100000}</div>
          )}
        />
        <div className="flex items-center gap-1">
          <div className="text-sm font-semibold flex flex-col gap-1">
            <label className="ml-3" htmlFor="minPrice">
              Starts from
            </label>
            <input
              type="number"
              onChange={(e: any) => handlePrice('minPrice', e)}
              value={minPrice}
              name="minPrice"
              id="minPrice"
              className="w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1"
              placeholder="300.000"
            />
          </div>
          <div className="text-sm font-semibold flex flex-col gap-1">
            <label className="ml-3" htmlFor="maxPrice">
              to
            </label>
            <input
              type="number"
              onChange={(e: any) => handlePrice('maxPrice', e)}
              value={maxPrice}
              name="maxPrice"
              id="maxPrice"
              className="w-full rounded-full border border-slate-300 bg-white text-xs placeholder-shown:text-xs text-gray-800 focus:outline-1 px-3 py-1"
              placeholder="3.000.000"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <button
            onClick={() => {
              handlePriceFilterSubmit()
              mutateExploreFilterAndSort()
            }}
            className="w-full text-xs font-bold hover:opacity-75 transition duration-100 active:scale-90 text-white bg-gray-900 rounded-full py-2 px-3 shadow-md"
            type="button"
          >
            Set price
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPrice
