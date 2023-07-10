import { usePostsContext } from '../hooks/usePostsContext'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const PostDetails = ({ post }) => {
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

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

    const handleLike = async () => {
        if (!user) {
            return
        }
        
        const increment = post.likes+1

        const response = await fetch('/api/posts/' + post._id, {
            method: 'PATCH',
            body: JSON.stringify({
                likes: increment
            }),
            headers: {
                'Authorization' : `Bearer ${user.token}`,
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const json = await response.json()
        json.likes = json.likes + 1

        if (response.ok) {
            dispatch({type: 'INCREMENT_LIKES', payload: json})
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
            {post.username === user.username && <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>}
            {/* <span className="material-symbols-outlined" onClick={handleDelete}>delete</span> */}
            <Link to={`/post/${post._id}`}>
                <h4>{post.title}</h4>
                <div className="image">
                    <img src={post.image} alt={post.caption}></img>
                </div>
            </Link>
            <div className="username-caption"> 
                <Link to={`/Profile/${post.username}`}>
                    <p className="username">{post.username }&ensp;</p>
                </Link>
                <p className="caption">{post.caption}</p>
            </div>

            {/* post.likedArray.IndexOf(user.username) >= 0; */}
            <span className="material-symbols-outlined" onClick={handleLike}>favorite</span>
            
            <p><strong>Likes: </strong> {post.likes}</p>
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        </div>
     );
}
 
export default PostDetails;