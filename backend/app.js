import express from 'express'
import createNotesRouter from './routes/notes.js'
import createTagsRouter from './routes/tags.js'
const PORT = 3003

export default function createApp () {
  const app = express()

  app.use(express.json())

  app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token')
    res.header('Access-Control-Allow-Methods', '*')
    next()
  })

  app.use('/notes', createNotesRouter())

  app.use('/tags', createTagsRouter())

  app.use('*', (_, res) => {
    res.send('<h1>Working!</h1><h2>404 page not found</h2>')
  })

  app.listen(PORT, () => console.log(`APP listening on port ${PORT}`))
}
