import React, { useState, useContext, createContext } from 'react'

export const LocationContext = createContext()

export function useLocation() {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider')
    }
    return context
}

export function LocationProvider({ children }) {
    const [location, setLocation] = useState({
        longitude: -74.0060,
        latitude: 40.7128
    })

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    )
}