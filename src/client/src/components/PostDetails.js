// import { useEffect } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const PostDetails = ({ post }) => {

    const { dispatch } = usePostsContext()
    const { user } = useAuthContext

    const handleDelete = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json})
        }
    }

    // const handleFavorite = async (post._id) => {
    //     const response = await fetch('/api/posts/' + post._id, {
    //         method: 'PATCH'
    //     })
    //     const json = await response.json()

    //     if (response.ok) {
    //         await json.updateOne({post})
    //         dispatch({type: 'INCREMENT_LIKES', payload: json})
    //     }
    // }

    return ( 
        <div className="post-details">
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
            <Link to={`/post/${post._id}`}>
                <h4>{post.image}</h4>
            </Link>
            <p>{post.caption}</p>
            {/* <span className="material-symbols-outlined" onClick={handleFavorite}>favorite</span> */}
            <p><strong>Likes: </strong> {post.likes}</p>
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        </div>
     );
}
 
export default PostDetails;