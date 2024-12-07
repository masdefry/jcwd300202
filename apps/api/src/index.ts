import express, {Express, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './connection';
import router from './routers';

const app: Express = express()
const port = 5000
app.use(express.json())

const corsOption = {
  origin: '*',
  credentials: true
}
app.use(cors(corsOption))
app.use('/api', router)

interface IError extends Error {
  msg: string,
  status: number
}

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: true,
    message: error.message === 'jwt expired' || error.msg || error.message,
    data: {}
  })
})

app.listen(port, () => {
  console.log(`[Server] is running on http://localhost:${port}`)
})

