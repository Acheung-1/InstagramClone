import { createContext, useReducer } from 'react'

export const PostsContext = createContext()

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((p) => p._id !== action.payload._id)
            }
        case 'INCREMENT_LIKES':
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return {
                        ...post,
                        likes: action.payload.likes,
                        userLiked: action.payload.userLiked
                    };
                }
                return post;
            });
            return {
                posts: updatedPosts
            };
        default:
            return state
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })

    return (
        <PostsContext.Provider value={{...state, dispatch}}>
            { children }
        </PostsContext.Provider>
    )
}