import express, {Express, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { prisma } from './connection';
import router from './routers';
import cron from 'node-cron'
import bodyParser from 'body-parser';
import { getTransactionStatusService } from '@/services/transaction.service/index'

const app: Express = express()
const port = 5000
app.use(express.json())

const corsOption = {
  origin: '*',
  credentials: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption))
app.use('/api', router)

// cron.schedule('* * * * *', async () => {
//   console.log('Running cron job: Handling expired transactions...');
//   await handleExpiredTransaction()
// })


cron.schedule('* * * * *', async () => {
  console.log('Running cron job: Checking transaction status...');
  
  try {
 
    const transactions = await prisma.transaction.findMany();

    if (transactions.length === 0) {
      console.log('No transactions to check.');
      return;
    }

    for (const transaction of transactions) {
      console.log(`Checking transaction ID: ${transaction.id}`);
      await getTransactionStatusService(transaction.id); 
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

interface IError extends Error {
  msg: string,
  status: number
}

app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: true,
    message: error.msg ? error.msg : error.name === 'TokenExpiredError' ? error.message : 'Something went wrong!',
    data: {}
  })
})

app.listen(port, () => {
  console.log(`[Server] is running on http://localhost:${port}`)
})

