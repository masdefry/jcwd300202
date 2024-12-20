import express, {Express, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './connection';
import router from './routers';
import cron from 'node-cron'
// import { handleExpiredTransaction } from '@/services/transaction.service/index'


const app: Express = express()
const port = 5000
app.use(express.json())

const corsOption = {
  origin: '*',
  credentials: true
}
app.use(cors(corsOption))
app.use('/api', router)

// cron.schedule('0 0 * * *', async () => {
//   console.log('Running cron job: Handling expired transactions...');
//   await handleExpiredTransaction()
// })

interface IError extends Error {
  msg: string,
  status: number
}

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: true,
    // message: error.msg ? error.msg : error.name === 'TokenExpiredError' ? error.message : 'Something went wrong!',
    message: error.message,
    data: {}
  })
})

app.listen(port, () => {
  console.log(`[Server] is running on http://localhost:${port}`)
})

