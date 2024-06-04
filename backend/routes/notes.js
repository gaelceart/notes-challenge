import { Router } from 'express'
import { NotesController } from '../controllers/notes.js'

export default function createNotesRouter () {
  const router = Router()
  const controller = new NotesController()

  router.get('/', async (req, res) => {
    const condition = { ...req.query }
    const query = { condition }
    return res.send(await controller.getNotes(query))
  })

  router.post('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.createNote(query))
  })

  router.patch('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.updateNote(query))
  })

  router.delete('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.deleteNote(query))
  })

  router.get('*', (_, res) => {
    res.send('<h1>Working on Notes!</h1><h2>404 page not found</h2>')
  })

  return router
}
