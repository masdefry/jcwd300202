import {  deleteUserProfile, getUserProfile, updateUserEmail, updateUserProfile, updateUserProfilePicture } from "@/controllers/user.controller";
import { uploader } from "@/middlewares/uploader";
import { userRoleValidation } from "@/middlewares/user.role.validation";
import { deletePropertyValidator } from "@/middlewares/validator";
import { updateUserProfileValidator } from "@/middlewares/validator/update.user.profile.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', verifyToken, userRoleValidation, getUserProfile)
userRouter.patch('/', verifyToken, userRoleValidation, updateUserProfileValidator, updateUserProfile)
userRouter.patch('/email', verifyToken, userRoleValidation, updateUserEmail)
userRouter.patch('/profile-picture', verifyToken, userRoleValidation, uploader ,updateUserProfilePicture)
userRouter.patch('/delete', verifyToken, userRoleValidation, deletePropertyValidator, deleteUserProfile)

export default userRouter