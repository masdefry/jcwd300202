import * as Yup from 'yup'

export const requestEmailResetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().required('Field must be filled!')
        .email('Email address invalid!').max(180, 'Maximum 180 characters allowed!')
})