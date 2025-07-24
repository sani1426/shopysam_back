import express from 'express'
import dotenv from 'dotenv'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import ConnectToDb from './config/db.js'
import digitalRouter from './routes/digital.routes.js'
import clothRouter from './routes/cloth.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import uploadRouter from './routes/upload.routes.js'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: 'https://shopysam-next.vercel.app',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    preflightContinue: false,
  })
)

//  routes  //

app.use('/api/auth', userRouter)
app.use('/api/digitals', digitalRouter)
app.use('/api/cloth', clothRouter)
app.use('/api/admin', adminRouter)
app.use('/api/file', uploadRouter)

//  running server //
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`)
  ConnectToDb()
})
