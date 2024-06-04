import { TagsModel } from '../models/tags.js'
import { NotesController } from '../controllers/notes.js'

export class TagsController {
  constructor () {
    this.model = new TagsModel()
  }

  getNoteTags = async query => {
    return await this.model.getNoteTags(query)
  }

  getTags = async query => {
    const [mode, response] = await this.model.getTags(query)
    if (mode === 'all_tags') return [...new Set(response.map(tags => tags.tag))]
    const notesID = response.map(tagged => tagged.note_id)
    const notes = await new NotesController().getNotes({ condition: { id: notesID } })
    return notes
  }

  addTag = async query => {
    return await this.model.addTag(query)
  }

  removeTag = async query => {
    return await this.model.removeTag(query)
  }
}
