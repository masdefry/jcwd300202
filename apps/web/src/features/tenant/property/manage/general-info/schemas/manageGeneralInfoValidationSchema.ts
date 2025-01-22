import * as Yup from 'yup'

export const manageGeneralInfoValidationSchema = Yup.object().shape({
 cityId: Yup.number().required('City is required').min(1, 'City must be filled'),
 
 countryId: Yup.number().required('Country is required').min(1, 'Country must be filled'),
 
   name: Yup.string()
   .matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')
     .required('Property name is required'),
 
   zipCode: Yup.string()
     .matches(/^[0-9]{5}$/, 'Zip code must be a 5-digit number')
     .required('Zip code is required'),
 
   address: Yup.string()
   .matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')
     .required('Address is required'),
 
   location: Yup.string().required('Location is required'),
 
   star: Yup.number()
     .max(5, 'Star rating must be between 1 and 5')
     .nullable(),
 
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
 
   propertyTypeId: Yup.number().min(1, 'Property type ID invalid').required('Property type is required'),
 
   propertyTypeName: Yup.string()
     .matches(/^[a-zA-Z0-9\s]*$/, 'Only alphanumeric characters and spaces allowed')
     .nullable(),
  phoneNumber: Yup.string()
     .matches(/^[\+0-9\s]*$/, 'Invalid phone number')
     .required('Property phone number is required'),
 
   url: Yup.string()
     .url('Invalid URL format')
     .nullable(),
 
   totalRooms: Yup.number()
     .min(1, 'Total rooms must be at least 1')
     .required('Total rooms is required'),
})