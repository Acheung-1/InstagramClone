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
            // state.posts.updateOne({_id: action.payload._id}, {$inc: {likes: 1}})
            return state
            // const postId = action.payload._id;
            // const updatedPost = {
            //     ...state.posts[postId],
            //     likes: state.posts[postId].likes + 1
            // };
            // return {
            //     ...state,
            //     posts: {
            //     ...state.posts,
            //     [postId]: updatedPost
            //     }
            // };
            // // return state
            // updateOne({_id: p._id}, {$inc: {likes: 1}})
            // return {
            //     posts: action.payload
            // }
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