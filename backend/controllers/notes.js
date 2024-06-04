import { NotesModel } from '../models/notes.js'

export class NotesController {
  constructor () {
    this.model = new NotesModel()
  }

  getNotes = async query => {
    return await this.model.getNotes(query)
  }

  createNote = async query => {
    return await this.model.createNote(query)
  }

  updateNote = async query => {
    return await this.model.updateNote(query)
  }

  deleteNote = async query => {
    return await this.model.deleteNote(query)
  }
}
