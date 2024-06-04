import { SERVER_ADDRESS } from '../constants/SERVER_ADDRESS.js'

export async function createNoteRequest () {
  return await fetch(`${SERVER_ADDRESS}/notes`, { method: 'POST' })
}

export async function getAllNotesRequest () {
  const response = await fetch(`${SERVER_ADDRESS}/notes`, { method: 'GET' })
  const data = await response.json()
  return data
}

export async function getNotesRequest (params) {
  let { query } = params
  if (!query) query = ''
  const response = await fetch(`${SERVER_ADDRESS}/notes?${query}`, { method: 'GET' })
  const buffer = await response.json()
  return buffer[0]
}

export function patchNotesRequest (params) {
  const { query } = params
  return fetch(`${SERVER_ADDRESS}/notes?${query}`, { method: 'PATCH' })
}

export async function deleteNotesRequest (params) {
  const { query } = params
  return await fetch(`${SERVER_ADDRESS}/notes?${query}`, { method: 'DELETE' })
}

export function addTagRequest (params) {
  const { query } = params
  return fetch(`${SERVER_ADDRESS}/tags?${query}`, { method: 'POST' })
}

export async function getTagsRequest () {
  const response = await fetch(`${SERVER_ADDRESS}/tags`, { method: 'GET' })
  const buffer = await response.json()
  return buffer
}

export async function getNoteTagsRequest (params) {
  const { query } = params
  const response = await fetch(`${SERVER_ADDRESS}/tags/note?${query}`, { method: 'GET' })
  const buffer = await response.json()
  const raw = [...buffer]
  const ret = []
  raw.forEach(e => {
    ret.push(e.tag)
  })
  console.log({ ret })

  return ret
}

export function removeTagRequest (params) {
  const { query } = params
  return fetch(`${SERVER_ADDRESS}/tags?${query}`, { method: 'DELETE' })
}
