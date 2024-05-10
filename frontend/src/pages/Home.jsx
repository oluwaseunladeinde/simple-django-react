import { useState, useEffect } from 'react'
import api from '../api'
import Note from "../components/Note"
import "../styles/Home.css"
import LoadingIndicator from '../components/LoadingIndicator'


function Home() {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get(`/api/notes/`)
            .then(res => res.data)
            .then((data) => {
                console.log({ data });
                setNotes(data)
            })
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) console.log("Note deleted")
                else console.log("Note not deleted")
                //getNotes();

                const updatedNotes = notes.filter((item) => item.id !== id);
                setNotes(updatedNotes)
            })


    }

    const createNote = (e) => {
        e.preventDefault()
        setLoading(true)
        api
            .post(`/api/notes/`, { content, title })
            .then((res) => {
                if (res.status === 201) console.log("Note created")
                else console.log("Note not created")
                getNotes()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <form onSubmit={createNote}>
                <h2>Create a Note</h2>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                {loading && <LoadingIndicator />}
                <button type="submit">Submit Note</button>
            </form>
        </div>
    )
}

export default Home
