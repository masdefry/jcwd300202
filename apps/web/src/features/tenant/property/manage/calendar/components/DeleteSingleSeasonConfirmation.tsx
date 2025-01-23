'use client'

import React from 'react'

const DeleteSingleSeasonConfirmation = ({
  setShowDeleteSingleSeasonConfirmation,
  mutateDeleteSingleSeason,
  mutateDeleteSeason,
  viewMode
}: {
  setShowDeleteSingleSeasonConfirmation: any
  mutateDeleteSingleSeason: any
  mutateDeleteSeason: any
  viewMode: string
}) => {
  return (
    <div
      className={` backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-25 z-[51] flex items-center justify-center`}
    >
      <div className="bg-white rounded-3xl flex flex-col justify-between gap-3 p-5">
        <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
          Are you sure you want to delete this season?
        </h1>
        <article className="text-sm font-medium text-gray-500">
          This action will permanently remove the season details from your
          rental. You won&#39;t be able to recover it afterward.
        </article>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowDeleteSingleSeasonConfirmation(false)}
            className="border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center"
          >
            No, keep season
          </button>
          <button
            type="button"
            onClick={() => {
              setShowDeleteSingleSeasonConfirmation(false)
              if (viewMode === 'monthly-view') {
                mutateDeleteSingleSeason()
              } else {
                mutateDeleteSeason()
              }
            }}
            className="z-20 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-90 transition duration-100 bg-red-600 text-white text-sm font-bold px-5 py-3 shadow-md justify-center"
          >
            Yes, delete season
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteSingleSeasonConfirmation
