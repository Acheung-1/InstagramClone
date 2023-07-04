import { usePostsContext } from '../hooks/usePostsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const PostDetails = ({ post }) => {
    const { dispatch } = usePostsContext()

    const handleClick = async () => {
        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json})

        }

    }

    return ( 
        <div className="post-details">
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <h4>{post.image}</h4>
            <p>{post.caption}</p>
            <p><strong>Likes: </strong> {post.likes}</p>
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        </div>
     );
}
 
export default PostDetails;