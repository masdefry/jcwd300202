import * as Yup from 'yup'

export const manageRoomValidationSchema = Yup.object().shape({
    name: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'Only alphanumeric characters and spaces allowed')
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
})