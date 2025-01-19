'use client'

import React from 'react'

const ButtonPropertyTypePagination = ({ isPending, dataPropertyTypes, handlePagination }: { dataPropertyTypes: any, handlePagination: ({limit, offset}: { limit: string, offset: string }) => void, isPending: boolean }) => {
  return (
    <div id='pagination-button' className='w-full flex justify-center'>
        <div className="join">
            {
                Array.from({ length: dataPropertyTypes?.totalPage }).map((_, index) => {
                    if(index + 1 === dataPropertyTypes?.pageInUse) {
                        return (
                            <button key={index} disabled className="join-item btn btn-sm">{index + 1}</button>
                        )
                    }
                    return(
                        <button key={index} onClick={() => handlePagination({ limit: '5', offset: (index * 5).toString()})} className="join-item btn btn-sm">{index + 1}</button>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ButtonPropertyTypePagination
