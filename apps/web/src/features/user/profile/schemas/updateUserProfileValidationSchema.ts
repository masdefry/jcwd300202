import * as Yup from 'yup'

export const updateUserProfileValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email address invalid!')
    .required('Field must be filled!'),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,.'-]*$/,
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    )
    .nullable(),
  gender: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters allowed')
    .nullable(),
  phoneNumber: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters allowed')
    .nullable(),
  cityName: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,.'-]*$/,
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    )
    .nullable(),
  countryName: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,.'-]*$/,
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    )
    .nullable(),
  cityId: Yup.number().nullable(),
  countryId: Yup.number().nullable(),
  date: Yup.number().nullable(),
  month: Yup.number().nullable(),
  year: Yup.number().nullable(),
  address: Yup.string()
    .matches(
      /^([^.,]*([.,][^.,]*){0,7}){0,1}$/,
      'No more than 7 dots and commas allowed',
    )
    .matches(/^[a-zA-Z0-9\s.,-]*$/, 'No special characters allowed')
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
