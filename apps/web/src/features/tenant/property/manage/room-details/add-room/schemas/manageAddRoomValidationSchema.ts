import * as Yup from 'yup'

export const manageAddRoomValidationSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')
    .required('Room type name is required'),

  capacity: Yup.number()
    .min(1, 'Room capacity must be at least 1')
    .required('Room capacity is required'),

  totalRooms: Yup.number()
    .min(1, 'Total rooms for this type must be at least 1')
    .required('Total rooms is required'),

  price: Yup.number()
    .min(1, 'Price must be greater than 0')
    .required('Price is required'),

  rooms: Yup.number()
    .min(1, 'Rooms must be at least 1')
    .required('Rooms are required'),

  bathrooms: Yup.number()
    .min(1, 'Bathrooms must be at least 1')
    .required('Bathrooms are required'),

  description: Yup.string().matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!').required('Room description are required'),

  propertyRoomFacilitiesId: Yup.array()
    .of(Yup.number().min(1, 'Room facility ID must be greater than 0'))
    .nullable(),

  file: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileSize', 'Maximum 1MB file size allowed', (file) => {
          const limitFileSize = 1000000
          return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', (file) => {
          const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'gif']
          return file && fileFormatAccepted.includes(file.type.split('/')[1])
        }),
    )
    .min(3, 'At least 3 image must be included')
    .max(5, 'Maximum 5 image allowed'),
})
