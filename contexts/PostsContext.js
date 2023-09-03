import React, { useState, useContext, createContext } from 'react'

export const PostsContext = createContext(null)

export function usePosts() {
    const context = useContext(PostsContext)
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider')
    }
    return context
}

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState([])

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}