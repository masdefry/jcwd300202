import * as Yup from 'yup'

export const createPropertyValidationSchema = Yup.object().shape({
  cityId: Yup.number()
    .required('City ID is required')
    .min(1, 'City ID must be greater than 0'),

  countryId: Yup.number()
    .required('Country ID is required')
    .min(1, 'Country ID must be greater than 0'),

  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      'Only alphanumeric characters and spaces allowed',
    )
    .required('Property name is required'),

  zipCode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Zip code must be a 5-digit number')
    .required('Zip code is required'),

  address: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s.,]*$/,
      'No special characters allowed except . and ,',
    )
    .required('Address is required'),

  location: Yup.string().url('Invalid URL format').required('Location is required'),

  star: Yup.number().max(5, 'Star rating must be between 1 and 5').nullable(),

  checkInStartTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .required('Check-in start time is required'),

  checkInEndTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .nullable(),

  checkOutStartTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .nullable(),

  checkOutEndTime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .required('Check-out end time is required'),

  propertyTypeId: Yup.number()
    .min(1, 'Property type ID invalid')
    .required('Property type is required'),

  propertyTypeName: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      'Only alphanumeric characters and spaces allowed',
    )
    .nullable(),

  propertyFacilitiesId: Yup.array()
    .of(Yup.number().min(1, 'Room facility ID must be greater than 0'))
    .min(1, 'At least one facility must be selected')
    .nullable(),

  propertyFacilitiesName: Yup.array().of(Yup.string()).nullable(),

  propertyImages: Yup.array()
    .of(
      Yup.mixed<File>()
        .required('Image is required')
        .test('fileSize', 'Maximum 1MB file size allowed', (file) => {
          const limitFileSize = 1000000
          return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', (file) => {
          const fileFormatAccepted = ['jpg', 'jpeg', 'png']
          return file && fileFormatAccepted.includes(file.type.split('/')[1])
        }),
    )
    .min(5, 'At least 5 image must be included')
    .max(7, 'Maximum 7 image allowed'),

  propertyDescription: Yup.string().required(
    'Property description is required',
  ),

  neighborhoodDescription: Yup.string().required(
    'Neighborhood description is required',
  ),

  phoneNumber: Yup.string()
    .matches(/^[\+0-9\s]*$/, 'Invalid phone number')
    .required('Property phone number is required'),

  url: Yup.string().url('Invalid URL format').nullable(),

  totalRooms: Yup.number()
    .min(1, 'Total rooms must be at least 1')
    .required('Total rooms is required'),

  propertyRoomTypes: Yup.array()
    .of(
      Yup.object().shape({
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

        description: Yup.string().required('Room description are required'),

        roomFacilities: Yup.array()
          .of(Yup.number().min(1, 'Room facility ID must be greater than 0'))
          .nullable(),

        roomImages: Yup.array()
          .of(
            Yup.mixed<File>()
              .required('Image is required')
              .test('fileSize', 'Maximum 1MB file size allowed', (file) => {
                const limitFileSize = 1000000
                return file && file.size <= limitFileSize
              })
              .test(
                'fileFormat',
                'File format must be png, jpg, or jpeg',
                (file) => {
                  const fileFormatAccepted = ['jpg', 'jpeg', 'png']
                  return (
                    file && fileFormatAccepted.includes(file.type.split('/')[1])
                  )
                },
              ),
          )
          .min(3, 'At least 3 image must be included')
          .max(5, 'Maximum 5 image allowed'),
      }),
    )
    .min(1, 'At least one room type must be defined')
    .required('Room types are required'),
})
