import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Field must be filled!').email('Email address invalid!').max(180, 'Maximum 180 characters allowed!'),
    password: Yup.string().required('Field must be filled!').min(8, 'Minimum 8 characters required!').max(180, 'Maximum 180 characters allowed!')
})