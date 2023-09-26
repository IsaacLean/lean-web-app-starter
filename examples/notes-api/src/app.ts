import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createNotFoundErrorHandler, globalErrorHandler } from './core/error'
import { frontendHandler } from './routes'
import { apiHandler } from './routes/api'

const app = express()

app.set('view engine', 'ejs')
app.set('views', [path.resolve(__dirname, 'views')])

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', frontendHandler)

app.use('/api', apiHandler)

app.all('*', createNotFoundErrorHandler())

app.use(globalErrorHandler)

export default app
