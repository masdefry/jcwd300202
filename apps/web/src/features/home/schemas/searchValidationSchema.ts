import * as Yup from 'yup'

export const searchValidationSchema = Yup.object().shape({
    country: Yup.number().required('Please choose your destination'),
    city: Yup.number(),
    checkInDate: Yup.date().required('Please fill in the check in date'),
    checkOutDate: Yup.date().required('Please fill in the check out date'),
    adult: Yup.number().required('Please choose the number of total guests'),
    children: Yup.number()
})