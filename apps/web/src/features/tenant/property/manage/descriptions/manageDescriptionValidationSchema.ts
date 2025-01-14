import * as Yup from 'yup'

export const manageDescriptionValidationSchema = Yup.object().shape({
  propertyDescription: Yup.string().required('Property description is required'),

  neighborhoodDescription: Yup.string().required('Neighborhood description is required'),

  propertyRoomType: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Room description are required'),
    }),
  ),
})
