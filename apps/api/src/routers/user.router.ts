import {  getUserProfile, updateUserProfile, updateUserProfilePicture } from "@/controllers/user.controller";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', getUserProfile)
userRouter.patch('/', updateUserProfile)
userRouter.patch('/profile-picture', uploader ,updateUserProfilePicture)

export default userRouter