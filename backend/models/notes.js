import { Note } from '../constants/entities.js'
import { sequelize } from '../utils/sequelize.js'
export class NotesModel {
  getNotes = async query => {
    const { condition } = query
    const options = condition ? { where: condition } : {}
    options.order = [['updatedAt', 'DESC']]
    return await Note.findAll(options).catch(err => { return [-1, err.name] })
  }

  createNote = async query => {
    const { ...fields } = query
    return await Note.create(fields).catch(err => { return [-1, err.name] })
  }

  updateNote = async query => {
    const { id, ...fields } = query
    fields.updatedAt = sequelize.literal('CURRENT_TIMESTAMP')
    return await Note.update(fields, { where: { id } }).catch(err => { return [-1, err.name] })
  }

  deleteNote = async query => {
    const { id } = query
    const response = await Note.destroy({ where: { id } }).catch(err => { return [-1, err.name] })
    return [response]
  }
}
