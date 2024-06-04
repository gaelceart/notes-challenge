import React, { useState } from 'react'

export default function MiniNote ({ params, handleDelete, onClick, onSave }) {
  const [props, setProps] = useState(params)

  const updateProps = ({ key, value }) => {
    setProps(old => {
      const { ...updated } = old
      updated[key] = value
      onSave(updated)
      return updated
    })
  }

  const onArchive = () => {
    const value = props.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE'
    updateProps({ key: 'status', value })
  }

  const lastUpdated = props.updatedAt
  return (
    <article id={props.id + 'mini'} className='flex flex-col w-64 h-64 border border-amber-200 hover:scale-105 transition-all'>
      <nav className='flex relative w-full h-6 px-2 justify-between bg-amber-200'>
        <span id='delete' onClick={() => handleDelete(props.id)} className='cursor-pointer'>🗑️</span>
        <strong onClick={() => onClick(props)} className='overflow-hidden whitespace-nowrap'>{props.title ?? ''}</strong>
        <span onClick={onArchive} className='cursor-pointer'>🗄️</span>
      </nav>
      <small className='px-6 py-1 text-center text-amber-200 opacity-40'>{lastUpdated}</small>
      <small className='h-full w-full px-2 text-amber-200 cursor-text text-wrap break-words' onClick={() => onClick(props)}>{props.body ?? ''}</small>
    </article>
  )
}
