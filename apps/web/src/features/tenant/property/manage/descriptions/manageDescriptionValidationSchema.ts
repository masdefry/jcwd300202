import * as Yup from 'yup'

export const manageDescriptionValidationSchema = Yup.object().shape({
  propertyDescription: Yup.string()
    .matches(
      /^([^.,-]*([.,-][^.,-]*){0,20}){0,1}$/,
      'No more than 20 dots, commas, or hyphens allowed',
    )
    .matches(/^[a-zA-Z0-9\s.,-]*$/, 'No special characters allowed')
    .required('Property description is required'),

  neighborhoodDescription: Yup.string()
    .matches(
      /^([^.,-]*([.,-][^.,-]*){0,20}){0,1}$/,
      'No more than 20 dots, commas, or hyphens allowed',
    )
    .matches(/^[a-zA-Z0-9\s.,-]*$/, 'No special characters allowed')
    .required('Neighborhood description is required'),

  propertyRoomType: Yup.array().of(
    Yup.object().shape({
      description: Yup.string()
        .matches(
          /^([^.,-]*([.,-][^.,-]*){0,20}){0,1}$/,
          'No more than 20 dots, commas, or hyphens allowed',
        )
        .matches(/^[a-zA-Z0-9\s.,-]*$/, 'No special characters allowed')
        .required('Room description are required'),
    }),
  ),
})
