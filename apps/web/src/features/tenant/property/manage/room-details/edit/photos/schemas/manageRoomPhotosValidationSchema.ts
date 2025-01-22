import * as Yup from 'yup'

export const manageRoomPhotosValidationSchema = Yup.object().shape({
  file: Yup.array()
    .of(
      Yup.mixed<File>()
        .required('Image is required')
        .test('fileSize', 'Maximum 1MB file size allowed', (file) => {
          const limitFileSize = 1000000
          return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', (file) => {
          const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'gif']
          return file && fileFormatAccepted.includes(file.type.split('/')[1])
        }),
    )
    .min(1, 'At least one image must be included')
    .max(5, 'Maximum 5 image allowed'),
})
