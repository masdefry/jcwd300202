import * as Yup from 'yup'

export const requestEmailResetPasswordValidationSchema = Yup.object().shape({
    email: Yup.st
})