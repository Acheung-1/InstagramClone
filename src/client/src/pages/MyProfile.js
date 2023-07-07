import { useEffect } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import PostDetails from '../components/PostDetails'
import PostForm from '../components/PostForm'

const MyProfile = () => {
    const {posts, dispatch} = usePostsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch({type: 'SET_POSTS', payload: null})
            const response = await fetch('api/posts/MyProfile', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_POSTS', payload: json})

            }
        }

        if (user) {
            fetchPosts()
        }
    }, [dispatch, user])
    return ( 
        <div className="home">
            { user && <PostForm />}
            <div className="posts">
                {posts && posts.map(post => (
                    <PostDetails post={post} key={post._id}/>
                ))}
            </div>
        </div>
     );
}
 
export default MyProfile;