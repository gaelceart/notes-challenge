import { Router } from 'express'
import { TagsController } from '../controllers/tags.js'

export default function createTagsController () {
  const router = Router()
  const controller = new TagsController()

  router.get('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.getTags(query))
  })

  router.get('/note', async (req, res) => {
    const { query } = req
    return res.send(await controller.getNoteTags(query))
  })

  router.post('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.addTag(query))
  })

  router.delete('/', async (req, res) => {
    const { query } = req
    return res.send(await controller.removeTag(query))
  })

  router.get('*', (_, res) => {
    res.send('<h1>Working on Tags!</h1><h2>404 page not found</h2>')
  })

  return router
}
