import { createContext, useReducer } from 'react'

export const PostsContext = createContext()

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })

    return (
        <PostsContext.Provider value={{posts: []}}>
            { children }
        </PostsContext.Provider>
    )
}