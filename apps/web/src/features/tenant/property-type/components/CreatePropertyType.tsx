'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { IoClose } from 'react-icons/io5'
const CreatePropertyType = ({ handleCreatePropertyType, handleUpdatePropertyType, setShowCreatePropertyType, isEdit = false, dataPropertyType }: {handleCreatePropertyType?:any, handleUpdatePropertyType?:any, dataPropertyType?: any , setShowCreatePropertyType: any, isEdit?: boolean}) => {
  const [ change, setChange ] = useState(true)
    return (
    <div className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] p-5 top-0 left-0 flex items-center justify-center">
      <Formik
      initialValues={{
        name: isEdit ? dataPropertyType?.name : '',
        description: isEdit ? dataPropertyType?.description : '',
      }}

      onSubmit={(values) => {
        if(isEdit) {
            handleUpdatePropertyType({
                name: values?.name,
                description: values?.description,
                id: dataPropertyType?.id,
            })
        } else {
            handleCreatePropertyType(values)
        }
        setShowCreatePropertyType(false)
      }}
      >
        {
            ({values}) => (
                <Form className="bg-white border border-slate-200 max-w-[400px] w-full shadow-md p-5 rounded-md flex flex-col gap-7">
                    <div className="flex items-center justify-end">
                    <IoClose
                        className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                        onClick={() => setShowCreatePropertyType(false)}
                    />
                    </div>
                    <hgroup className="flex flex-col mt-[-10px]">
                    <h1 className="text-lg font-bold text-slate-800">
                        {
                            isEdit ? 'Edit Property Type' : 'Add Property Type'
                        }
                    </h1>
                    <p className="text-sm font-light text-gray-500">
                        {
                            isEdit ? 'Edit Your Property Type Here!' : `Can't Find Your Property Type? Build It Here!`
                        }
                        
                    </p>
                    </hgroup>
                    <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-black ml-5">Name</label>
                        <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Hotel / Apartment / Villa"
                        className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                        />
                        <ErrorMessage
                        name="name"
                        component={'div'}
                        className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                        />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-bold text-black ml-5">
                        Description
                        </label>
                        <Field
                        as="textarea"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Highlight its main features and target audience."
                        className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-3xl px-5 py-2 h-[150px]"
                        />
                        <ErrorMessage
                        name="description"
                        component={'div'}
                        className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
                        />
                    </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                    <button
                        type="button"
                        onClick={() => setShowCreatePropertyType(false)}
                        className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={
                        !values?.name ||
                        !values?.description
                        // !dataCreatePropertyType?.name
                        }
                        // onClick={() => handleCreatePropertyType()}
                        className="disabled:bg-slate-300 disabled:text-white flex items-center justify-center disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                    >
                        {
                            isEdit ? 'Edit' : 'Create'
                        }
                    </button>
                    </div>
                </Form>
            )
        }
      </Formik>
    </div>
  )
}

export default CreatePropertyType
