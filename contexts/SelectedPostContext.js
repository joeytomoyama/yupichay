import React, { useState, useContext, createContext } from 'react'

export const SelectedPostContext = createContext(null)

export function useSelectedPost() {
    const context = useContext(SelectedPostContext)
    if (!context) {
        throw new Error('useSelectedPost must be used within a SelectedPostProvider')
    }
    return context
}

export function SelectedPostProvider({ children }) {
    const [selectedPost, setSelectedPost] = useState(null)

    return (
        <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
            {children}
        </SelectedPostContext.Provider>
    )
}