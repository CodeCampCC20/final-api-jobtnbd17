import express from 'express'

import { error } from './src/utils/error.js'
import authDocterRouter from './src/routes/authDoctorRouter.js'
import notFound from './src/utils/nofFound.js'
import authUserRouter from './src/routes/authUserRoutes.js'
import userRouter from './src/routes/userRoutes.js'


const PORT = 8888
const app = express()

app.use(express.json())

app.use('/auth',authDocterRouter)
app.use('/auth',authUserRouter)
app.use('/auth' , userRouter)

app.use(error)
app.use(notFound)


app.listen(PORT , () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})