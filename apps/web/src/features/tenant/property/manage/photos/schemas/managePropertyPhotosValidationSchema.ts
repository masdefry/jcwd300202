import * as Yup from 'yup'

export const managePropertyPhotosValidationSchema = Yup.object().shape({
 file: Yup.array().of(
     Yup.mixed<File>().required('Image is required').test('fileSize', 'Maximum 2MB file size allowed', file => {
         const limitFileSize = 2000000
         return file && file.size <= limitFileSize
     })
     .test('fileFormat', 'File format must be png, jpg, or jpeg', file => {
         const fileFormatAccepted = ['jpg', 'jpeg', 'png']
         return file && fileFormatAccepted.includes(file.type.split('/')[1])
     })
 ).min(1, 'At least one image must be included').max(7, 'Maximum 7 image allowed')
})