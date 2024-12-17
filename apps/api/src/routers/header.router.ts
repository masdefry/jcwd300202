import { getCityAndCountryList, fetchData } from '@/controllers/header.controller'
import { Router } from 'express'

const headerRouter = Router()

headerRouter.get('/search', fetchData)
headerRouter.get('/search/dropdown', getCityAndCountryList)

export default headerRouter