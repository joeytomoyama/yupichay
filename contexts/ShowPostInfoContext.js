import React, { useState, useContext, createContext } from 'react'

export const ShowPostInfoContext = createContext(null)

export function useShowPostInfo() {
    const context = useContext(ShowPostInfoContext)
    if (!context) {
        throw new Error('useShowPostInfo must be used within a ShowPostInfoProvider')
    }
    return context
}

export function ShowPostInfoProvider({ children }) {
    const [showPostInfo, setShowPostInfo] = useState(false)

    return (
        <ShowPostInfoContext.Provider value={{ showPostInfo, setShowPostInfo }}>
            {children}
        </ShowPostInfoContext.Provider>
    )
}