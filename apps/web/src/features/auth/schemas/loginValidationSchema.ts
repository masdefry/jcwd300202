import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Field must be filled!')
    .email('Email address invalid!').max(180, 'Maximum 180 characters allowed!'),
    password: Yup.string().matches(/^([^.,#]*([.,#][^.,#]*){0,3}){0,1}$/, 'No more than 3 of .,# allowed')
    .matches(/^[a-zA-Z0-9\s.,#]*$/, 'No special characters allowed except .,#').required('Field must be filled!'),
    
})