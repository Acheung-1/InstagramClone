import { useState } from "react"

const PostForm = () => {
    const [image, setImage] = useState('')
    const [caption, setCaption] = useState('')
    const likes = 0
    const [error, setError] = useState(null)

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
        }
        if (response.ok) {
            setImage('')
            setCaption('')
            setError(null)
            console.log('new post added', json)
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
            />

            <label> Post caption:</label>
            <input 
                type="text" 
                onChange={(e) => setCaption(e.target.value)}
                value = {caption}
            />

            <button>Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default PostForm;