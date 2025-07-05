import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ConnectToDb from './config/db.js'
import digitalRouter from './routes/digitalRouter.js'
import clothRouter from './routes/clothRouter.js'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    preflightContinue: true,
  })
)

//  routes  //

app.use('/api/auth', userRouter)
app.use('/api/digitals', digitalRouter)
app.use('/api/cloth', clothRouter)

//  running server //
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`)
  ConnectToDb()
})
