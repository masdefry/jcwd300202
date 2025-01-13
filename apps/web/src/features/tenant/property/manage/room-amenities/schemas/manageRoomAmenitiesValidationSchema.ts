import * as Yup from 'yup'

export const manageRoomAmenitiesValidationSchema = Yup.object().shape({
    propertyRoomFacilitiesId: Yup.array().of(Yup.number().min(1, 'Room facility ID must be greater than 0')).nullable()
})