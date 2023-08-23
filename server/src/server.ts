import express from 'express'
import dotenv from 'dotenv'

import { startDB } from './db/database'
import postRoute from './endpoints/post/postRoute'

dotenv.config()

const app = express()

startDB(process.env.DATABASE_URL as string)

app.use(express.json())

app.use('/api/posts', postRoute)

app.listen(process.env.PORT, () => console.log(`listening at port: ${process.env.PORT}`))