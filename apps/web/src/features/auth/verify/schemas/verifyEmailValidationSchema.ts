import * as Yup from 'yup'

export const verifyEmailValidationSchema = Yup.object().shape({
    setPassword: Yup.string().matches(/^([^.,#]*([.,#][^.,#]*){0,3}){0,1}$/, 'No more than 3 of .,# allowed')
        .matches(/^[a-zA-Z0-9\s.,#]*$/, 'No special characters allowed except .,#').required('Field must be filled!'),
    confirmPassword: Yup.string().min(8, 'Minimum 8 characters required!')
    .oneOf([Yup.ref('setPassword'), ''], 'Password invalid! Check your password')
    .max(180, 'Maximum 180 characters allowed!').matches(/^[a-zA-Z0-9\s.,#]*$/, 'No special characters allowed except .,#')
    .required('Field must be filled!')
})