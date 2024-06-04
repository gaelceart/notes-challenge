import React, { useEffect, useState } from 'react'
import { addTagRequest, getNoteTagsRequest, removeTagRequest } from '../utils/request'

export default function Note ({ params, onDelete, onSave, onBack }) {
  const [props, setProps] = useState(params)
  const [tags, setTags] = useState(new Set([]))
  const [tagsElem, setTagsElem] = useState(null)
  const [showAddTag, setShowAddTag] = useState(false)

  const updateProps = ({ key, value }) => {
    let toUpdate
    setProps(old => {
      const { ...updated } = old
      updated[key] = value
      toUpdate = updated
      return updated
    })
    return toUpdate
  }

  const handleChange = elem => {
    const { id, value } = elem.target
    updateProps({ key: id, value })
  }

  const onArchive = () => {
    const value = props.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE'
    const updated = updateProps({ key: 'status', value })
    setTimeout(() => onSave(updated), 400)
  }

  const handleBack = () => {
    onBack(props)
  }

  const handleShowAddTag = () => {
    setShowAddTag(old => !old)
  }

  const updateTag = newTag => {
    let updated
    setTags(old => {
      updated = new Set(Array.from(old)).add(newTag)
      return updated
    })
  }

  const handleAddTag = () => {
    const newTag = document.getElementById('tag-input').value
    if (!newTag || newTag === '') return
    const query = `id=${props.id}&tag=${newTag}`
    addTagRequest({ query })
    updateTag(newTag)
  }

  const handleRemoveTag = tag => {
    const query = `id=${props.id}&tag=${tag}`
    removeTagRequest({ query })
    setTags(old => {
      const updated = new Set(Array.from(old))
      updated.delete(tag)
      return updated
    })
  }

  useEffect(() => {
    async function exec () {
      const query = `id=${params.id}`
      const response = await getNoteTagsRequest({ query })
      setTags(response)
    }
    exec()
  }, [])

  useEffect(() => {
    setTagsElem(Array.from(tags).map((t) => <small key={t} onClick={() => handleRemoveTag(t)} className='cursor-no-drop hover:text-red-800' title={`Remove ${t}`}>{t}</small>))
  }, [tags])

  return (
    <>
      <form id={props.id} className='absolute backdrop-blur-sm bg-slate-900 bg-opacity-80 flex flex-col w-3/4 h-2/3 border border-amber-200'>
        <nav className='flex w-full h-6 px-2 gap-1 justify-between bg-amber-200'>
          <span id='delete' onClick={() => onDelete(props.id)} className='cursor-pointer' title='Delete'>🗑️</span>
          <textarea onChange={handleChange} id='title' className='w-full max-h-6 text-center text-slate-800 resize-none font-bold bg-transparent focus:outline-none placeholder:opacity-50 placeholder:text-slate-800 overflow-auto' placeholder='Title' value={props.title ?? ''} />
          <span onClick={() => onArchive(props)} className='cursor-pointer'>🗄️</span>
          <span onClick={() => onSave(props)} className='cursor-pointer' title='Save'>💾</span>
        </nav>
        <textarea onChange={handleChange} id='body' className='w-full flex-grow p-2 bg-transparent text-amber-200 overflow-auto resize-none focus:outline-none placeholder:opacity-50' placeholder='Note' value={props.body ?? ''} />
        <footer className='flex flex-col'>
          <div className='px-2 flex justify-between text-amber-200 opacity-40'>
            <small>{props.status}</small>
            <small>{props.updatedAt}</small>
          </div>
          <div className='relative flex flex-row-reverse items-center w-full px-2 gap-2 bg-amber-200 text-slate-900'>
            <span onClick={handleShowAddTag} className='hover:scale-105 cursor-pointer' title='Add Tag'>🏷️</span>
            <section className='flex flex-nowrap text-nowrap gap-2 overflow-y-hidden overflow-x-visible'>
              {tagsElem}
            </section>
          </div>
          {showAddTag &&
            <section className='flex items-center justify-between px-2'>
              <input id='tag-input' className='text-sm text-end w-full h-6 placeholder:text-amber-200 placeholder:opacity-40 bg-transparent focus:outline-none text-amber-200 pr-2' placeholder='Type tag name' />
              <span onClick={handleAddTag} className='text-sm cursor-pointer hover:scale-105'>✅</span>
            </section>}
        </footer>
      </form>
      <span onClick={handleBack} className='absolute -z-10 min-w-full min-h-screen' />
    </>
  )
}
