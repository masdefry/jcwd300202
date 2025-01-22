import * as Yup from 'yup'

export const managePropertyFacilitiesValidationSchema = Yup.object().shape({
   propertyFacilitiesId: Yup.array().of(Yup.number().min(1, 'Room facility ID must be greater than 0')).min(1, 'At least one facility must be selected').nullable(),
 
   propertyFacilitiesName: Yup.array().of(Yup.string().matches(/^[a-zA-Z0-9\s,.'-]*$/, 'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!')).nullable(),
})
