import React, { useEffect, useState } from 'react'
import Note from './components/Note'
import MiniNote from './components/MiniNote'
import { createNoteRequest, getAllNotesRequest, getNotesRequest, patchNotesRequest, deleteNotesRequest, getTagsRequest } from './utils/request.js'

function App () {
  const status = ['ALL', 'ACTIVE', 'ARCHIVED']
  const [newNote, setNewNote] = useState(null)
  const [notes, setNotes] = useState(null)
  const [currentStatus, setCurentStatus] = useState(1)
  const [notesShown, setNotesShown] = useState(null)
  const [showTags, setShowTags] = useState(false)
  const [tags, setTags] = useState(null)
  const [tagsElem, setTagsElem] = useState(null)
  const [currentTag, setCurrentTag] = useState(null)

  const handleBack = data => {
    if (data) handleSave(data)
    setNewNote(null)
  }

  const showSingleNote = data => {
    setNewNote(data)
  }

  const createNote = data => {
    const createdNote = <MiniNote key={data.id} params={data} handleDelete={handleDelete} onClick={showSingleNote} onSave={handleSave} />
    setNotes(old => [createdNote, ...old])
  }

  const deleteNote = id => {
    setNotes(old => [...old].filter(n => n.key !== id.toString()))
  }

  const handleSave = note => {
    if (!note) return
    const { updatedAt, createdAt, ...attr } = note
    const asArray = Object.entries(attr)
    const attrNotNull = asArray.filter(([_, value]) => !!value)
    const query = new URLSearchParams(attrNotNull).toString()
    patchNotesRequest({ query })
    deleteNote(note.id)
    setTimeout(() => {
      createNote(note)
    }, 200)
  }

  const handleDelete = id => {
    const query = `id=${id}`
    deleteNotesRequest({ query })
    deleteNote(id)
    handleBack()
  }

  const newNoteHandler = async () => {
    const response = await createNoteRequest()
    if (!response.ok) return
    let query = 'id='
    await response.json().then(data => {
      query += data.id
      return true
    })
    const data = await getNotesRequest({ query })
    createNote(data)
    showSingleNote(data)
  }

  const handleStatus = () => {
    setCurentStatus(old => (old + 1) % 3)
  }

  const handleTagBtn = () => {
    setShowTags(old => !old)
  }

  useEffect(() => {
    const exec = async () => {
      const data = await getAllNotesRequest()
      setNotes(data.map(n => <MiniNote params={n} key={n.id} onClick={showSingleNote} handleDelete={handleDelete} onSave={handleSave} />))
    }
    exec()
  }, [])

  useEffect(() => {
    if (!notes) return
    const userStatus = status[currentStatus]
    if (userStatus === 'ALL') setNotesShown(notes)
    else setNotesShown(notes.filter(n => n.props.params.status === userStatus))
  }, [notes, currentStatus, newNote])

  useEffect(() => {
    const exec = async () => {
      const response = await getTagsRequest()
      setTags(response)
    }
    exec()
  }, [notes])
  console.log({ tags })

  useEffect(() => {
    if (!tags) return
    setTagsElem(tags.map((t) => <strong key={t + 'home'} className='text-amber-200 cursor-pointer hover:text-amber-100' title={`Remove ${t}`}>{t}</strong>))
  }, [tags])

  const tagsMenu = (
    <aside className='fixed flex flex-col items-center py-2  w-1/3 h-screen right-0 z-l0 backdrop-blur-sm bg-black bg-opacity-20'>
      {tagsElem}
    </aside>
  )

  const noteOnScreen = (
    <section className='fixed top-0 backdrop-blur-sm w-screen min-h-screen z-20 flex items-center justify-center'>
      <Note params={newNote} handleBack={handleBack} onSave={handleSave} onDelete={handleDelete} onBack={handleBack} />
    </section>
  )

  const home = (
    <>
      <main className='flex justify-center flex-wrap w-11/12 h-fit gap-3'>
        {notesShown}
      </main>
      <aside className='flex backdrop-blur-sm bg-black bg-opacity-20 justify-around gap-2 p-4 h-20 w-screen fixed bottom-0'>
        <button onClick={handleStatus} className='bg-amber-200 relative rounded-full w-32 px-2 py-2 text-xl font-bold hover:scale-110 transition-all'>{status[currentStatus]} </button>
        <button onClick={newNoteHandler} className='bg-amber-200 rounded-full px-4 py-2 text-2xl font-bold hover:scale-110 transition-all' title='New note'>+</button>
        <button onClick={handleTagBtn} className='bg-amber-200 relative rounded-full w-32 px-2 py-2 text-xl font-bold hover:scale-110 transition-all'>Tags</button>
      </aside>
    </>
  )

  const render = (
    <div className='flex flex-col py-8 relative justify-center items-center min-w-screen min-h-screen bg-slate-900'>
      {showTags && tagsMenu}
      {newNote && noteOnScreen}
      {home}
    </div>
  )

  return render
}

export default App
