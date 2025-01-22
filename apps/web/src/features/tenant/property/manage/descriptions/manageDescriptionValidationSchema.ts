import * as Yup from 'yup'

export const manageDescriptionValidationSchema = Yup.object().shape({
  propertyDescription: Yup.string().matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!').required('Property description is required'),

  neighborhoodDescription: Yup.string().matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!').required('Neighborhood description is required'),

  propertyRoomType: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!').required('Room description are required'),
    }),
  ),
})
