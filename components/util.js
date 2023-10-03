import * as Location from 'expo-location'

/**
 * Location object made up of longitude and latitude in that order.
 * @typedef {Object} LocationObject
 * @property {number} longitude
 * @property {number} latitude
 */

/**
 * gets the location if permission is granted
 * @param {function} setLocation
 * @returns {Promise<LocationObject>} location
 * @throws {Error} if permission is not granted
 */
export const getLocation = async (setLocation) => {
    // try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied')
            // setShowMakePost(false)
            // return
            throw new Error('Permission to access location was denied')
        }
    
        const { coords: { longitude, latitude } } = await Location.getCurrentPositionAsync({})
        setLocation({
            longitude,
            latitude
        })
        return {
            longitude,
            latitude
        }
    // } catch (error) {
    //     console.error(error)
    // }
}

export const getRoughLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied')
            return
        }

        const location = await Location.getLastKnownPositionAsync({})

    } catch (error) {
        console.error(error)
    }
}