import React, { useState, useContext, useMemo, createContext } from 'react'

export const PostsContext = createContext({
    posts: [],
    setPosts: () => {},
})

export function usePosts() {
    const context = useContext(PostsContext)
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider')
    }
    return context
}

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState([])

    const contextValue = useMemo(() => ({ posts, setPosts }), [posts])

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    )
}