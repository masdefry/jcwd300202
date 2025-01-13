import * as Yup from 'yup'

export const manageAddRoomValidationSchema = Yup.object().shape({
  // name: '',
  // capacity: '',
  // description: '',
  // totalRooms: '',
  // rooms: '',
  // bathrooms: '',
  // propertyRoomFacilitiesId: [],
  // file: []
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      'Only alphanumeric characters and spaces allowed',
    )
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

  description: Yup.string()
    .matches(
      /^([^.,-]*([.,-][^.,-]*){0,20}){0,1}$/,
      'No more than 20 dots, commas, or hyphens allowed',
    )
    .matches(/^[a-zA-Z0-9\s.,-]*$/, 'No special characters allowed')
    .required('Room description are required'),

  propertyRoomFacilitiesId: Yup.array()
    .of(Yup.number().min(1, 'Room facility ID must be greater than 0'))
    .nullable(),

  file: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileSize', 'Maximum 2MB file size allowed', (file) => {
          const limitFileSize = 2000000
          return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', (file) => {
          const fileFormatAccepted = ['jpg', 'jpeg', 'png']
          return file && fileFormatAccepted.includes(file.type.split('/')[1])
        }),
    )
    .min(1, 'At least one image must be included')
    .max(5, 'Maximum 5 image allowed'),
})
