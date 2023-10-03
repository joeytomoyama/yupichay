import React, { useState, useContext, createContext } from 'react'

export const RegionContext = createContext()

export function useRegion() {
    const context = useContext(RegionContext)
    if (!context) {
        throw new Error('useRegion must be used within a RegionProvider')
    }
    return context
}

export function RegionProvider({ children }) {
    const [region, setRegion] = useState({
		latitude: 40.7128,
		longitude: -74.0060,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
    })

    return (
        <RegionContext.Provider value={{ region, setRegion }}>
            {children}
        </RegionContext.Provider>
    )
}