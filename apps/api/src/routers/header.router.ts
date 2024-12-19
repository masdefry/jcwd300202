import { getCityAndCountryList, fetchData } from '@/controllers/header.controller'
import { Router } from 'express'

const headerRouter = Router()

headerRouter.get('/', fetchData)
headerRouter.get('/dropdown', getCityAndCountryList)

export default headerRouter