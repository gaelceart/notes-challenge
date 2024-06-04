import { Tagged } from '../constants/entities.js'
export class TagsModel {
  getTags = async query => {
    const { tag } = query
    const mode = tag ? 'get_notes' : 'all_tags'
    const options = mode === 'all_tags' ? { attributes: ['tag'], distinct: true } : { attributes: ['note_id'], where: { tag } }
    const response = await Tagged.findAll(options).catch(err => [-1, err.name])
    return [mode, response]
  }

  getNoteTags = async query => {
    const { id } = query
    const options = { attributes: ['tag'], where: { note_id: id } }
    const response = await Tagged.findAll(options).catch(err => [-1, err.name])
    console.log({ response })
    return response
  }

  addTag = async query => {
    const { id, tag } = query
    return await Tagged.create({ note_id: id, tag }).catch(err => [-1, err.name])
  }

  removeTag = async query => {
    const { id, tag } = query
    const response = await Tagged.destroy({ where: { note_id: id, tag } }).catch(err => [-1, err.name])
    return [response]
  }
}
