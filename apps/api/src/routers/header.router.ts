import { fetchData } from '@/controllers/header.controller'
import { Router } from 'express'

const headerRouter = Router()

headerRouter.post('/search', fetchData)

export default headerRouter