import * as Yup from 'yup'

export const verifyEmailValidationSchema = Yup.object().shape({
    setPassword: Yup.string().required('Field must be filled!')
    .min(8, 'Minimum 8 characters required!').max(180, 'Maximum 180 characters allowed!'),
    confirmPassword: Yup.string().min(8, 'Minimum 8 characters required!')
    .oneOf([Yup.ref('setPassword'), ''], 'Password invalid! Check your password')
    .max(180, 'Maximum 180 characters allowed!')
})