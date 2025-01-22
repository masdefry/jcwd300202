import * as Yup from 'yup'

export const updateTenantProfileValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address invalid!')
    .required('Field must be filled!'),
  pic: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters allowed!')
    .nullable(),
  companyName: Yup.string()
  .matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')
    .nullable(),
  phoneNumber: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters allowed')
    .nullable(),
  address: Yup.string()
  .matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')
    .nullable(),
  file: Yup.array().of(
    Yup.mixed<File>()
      .test('fileSize', 'Maximum 1MB file size allowed!', (file) => {
        const limitFileSize = 1000000
        return file && file.size <= limitFileSize
      })
      .test('fileFormat', 'File format must be png, jpg, or jpeg', (file) => {
        const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'gif']
        return file && fileFormatAccepted.includes(file.type.split('/')[1])
      }),
  ),
})
