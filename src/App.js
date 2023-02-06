import './App.css'
import { useState, useEffect } from 'react'
import { Note } from './Note'
import axios from 'axios'

export default function App (props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/notes')
      .then((response) => {
        setNotes(response.data)
        console.log(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    setNotes([...notes, noteToAddToState]) // Esta manera se llama spread.
    setNewNote('')
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  if (typeof notes === 'undefined' || notes === null || notes.length === 0) {
    return 'No tenemos notas que mostrar'
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        {showAll ? 'Show only important' : 'Show all'}
      </button>
      <ol>
        {notes
          .filter((note) => {
            if (showAll === true) return true
            return note.important === true
          })
          .map((note) => (
            <Note key={note.id} {...note} />
          ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
    </div>
  )
}
