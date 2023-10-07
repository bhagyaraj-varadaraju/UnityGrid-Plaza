import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

import eventsRouter from './routes/events.js'
import locationsRouter from './routes/locations.js'

dotenv.config({ path: '.env'})

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

app.use('/events', eventsRouter)
app.use('/', locationsRouter)
// app.get('/', (_, res) => res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnityGrid Plaza API</h1>'))

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
