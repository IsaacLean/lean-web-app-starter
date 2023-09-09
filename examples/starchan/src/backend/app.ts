import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createNotFoundErrorHandler, globalErrorHandler } from './core/error'
import { pageHandler } from './routes'
import { apiHandler } from './routes/api'

const app = express()

app.set('view engine', 'ejs')
app.set('views', [
    // Use the generated views from the frontend build
    path.join(__dirname, '../../build/frontend/generated-views'),
    path.join(__dirname, 'views'),
])

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve the frontend build as static files
app.use(
    '/static',
    express.static(path.join(__dirname, '../../build/frontend/public'))
)

// Serve the files in the public directory in backend src/ as static files
app.use('/static', express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', pageHandler)

app.use('/api', apiHandler)

app.all('*', createNotFoundErrorHandler())

app.use(globalErrorHandler)

export default app