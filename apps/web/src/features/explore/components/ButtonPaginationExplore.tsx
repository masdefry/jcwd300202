'use client'

import React from 'react'

const ButtonPaginationExplore = ({
  handlePagination,
  dataProperties,
}: {
  handlePagination: any,
  dataProperties: any,
}) => {
  return (
    <div id="pagination-button" className="w-full flex justify-center">
      <div className="join">
        {Array.from({ length: dataProperties?.totalPage }).map((_, index) => {
          if (index + 1 === dataProperties?.pageInUse) {
            return (
              <button key={index} disabled className="join-item btn btn-sm">
                {index + 1}
              </button>
            )
          }
          return (
            <button
              key={index}
              onClick={() => handlePagination({ limit: 5, offset: index * 5 })}
              className="join-item btn btn-sm"
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ButtonPaginationExplore
