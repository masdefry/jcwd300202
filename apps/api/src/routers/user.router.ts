import {  deleteUserProfile, getUserProfile, updateUserEmail, updateUserProfile, updateUserProfilePicture } from "@/controllers/user.controller";
import { uploader } from "@/middlewares/uploader";
import { deletePropertyValidator } from "@/middlewares/validator";
import { updateUserProfileValidator } from "@/middlewares/validator/update.user.profile.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', verifyToken, getUserProfile)
userRouter.patch('/', verifyToken, updateUserProfileValidator, updateUserProfile)
userRouter.patch('/email', verifyToken, updateUserEmail)
userRouter.patch('/profile-picture', verifyToken, uploader ,updateUserProfilePicture)
userRouter.patch('/delete', verifyToken, deletePropertyValidator, deleteUserProfile)

export default userRouter