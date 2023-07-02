import { useState } from "react"
import { usePostsContext } from '../hooks/usePostsContext'

const PostForm = () => {
    const { dispatch } = usePostsContext()

    const [image, setImage] = useState('')
    const [caption, setCaption] = useState('')
    const likes = 0
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const post = {image, caption, likes}

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if (response.ok) {
            setImage('')
            setCaption('')
            setError(null)
            setEmptyFields([])
            console.log('new post added', json)
            dispatch({type: 'CREATE_POST', payload: json})
        }
    }
    
    return ( 
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a new post</h3>
            <label> Post Image:</label>
            <input 
                type="text" 
                onChange={(e) => setImage(e.target.value)}
                value = {image}
                className={emptyFields.includes('image') ? 'error' : ''}
            />

            <label> Post caption:</label>
            <input 
                type="text" 
                onChange={(e) => setCaption(e.target.value)}
                value = {caption}
                className={emptyFields.includes('caption') ? 'error' : ''}
            />

            <button>Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default PostForm;