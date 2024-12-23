import {  deleteUserProfile, getUserProfile, updateUserProfile, updateUserProfilePicture } from "@/controllers/user.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', verifyToken, getUserProfile)
userRouter.patch('/', verifyToken, updateUserProfile)
userRouter.patch('/profile-picture', verifyToken, uploader ,updateUserProfilePicture)
userRouter.delete('/', verifyToken, deleteUserProfile)

export default userRouter