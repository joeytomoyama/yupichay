import React, { useState, useEffect, useRef } from 'react'
import { Text, View, TouchableHighlight, StyleSheet, Pressable } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import CustomPostMarker from './CustomPostMarker'
import MakePost from './MakePost'
import PostInfo from './PostInfo'

import { useSelectedPost } from '../contexts/SelectedPostContext'
import { useShowPostInfo } from '../contexts/ShowPostInfoContext'
import { useLocation } from '../contexts/LocationContext'
import { usePosts } from '../contexts/PostsContext'

import { getLocation } from './util'

export default function PostList({ navigation }) {

    const mapRef = useRef(null)

    const [showMakePost, setShowMakePost] = useState(false)

    const [isLoading, setLoading] = useState(true)

    const { posts, setPosts } = usePosts()
    const { selectedPost, setSelectedPost }= useSelectedPost()
    const { showPostInfo, setShowPostInfo } = useShowPostInfo()
	const { location, setLocation } = useLocation()

    // const getPosts = async () => {
    //     try {
    //         const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`)
    //         const json = await response.json()
    //         setPosts(json)
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

	/**
	 * get posts by location
	 */
	const getPostsByLocation = async () => {
		try {
			const { center: { longitude, latitude }, zoom } = await mapRef.current.getCamera()
			console.log(longitude, latitude, zoom)
			const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts?longitude=${longitude}&latitude=${latitude}&zoomLevel=${zoom}`)
			const json = await response.json()
			// setPosts((prev) => [ // adds new posts to old ones
			// 	...prev,
			// 	...json.filter(jPost => !prev.some(pPost => pPost._id === jPost._id))
			// ])
			setPosts(json)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

    const makePost = async () => {
		try {
			const { longitude, latitude } = await getLocation(setLocation)
			mapRef.current.animateToRegion({
				longitude: longitude,
				latitude: latitude,
				longitudeDelta: 0.0421,
				latitudeDelta: 0.0922,
			}, 1000)
			setTimeout(() => {
				setShowMakePost(true)
			}, 1000)
		} catch (error) {
			console.log(error)
		}
    }

    useEffect(() => {
		getLocation(setLocation)
			.then(() => {
				mapRef.current.animateToRegion({
					longitude: location.longitude,
					latitude: location.latitude,
					longitudeDelta: 0.0421,
					latitudeDelta: 0.0922,
				}, 1000)
				getPostsByLocation()
			})
			.catch((error) => {
				console.error(error)
				return
			})
    }, [])
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                ref={mapRef}
                showUserLocation={true}
                pitchEnabled={false}
                rotateEnabled={false}
                customMapStyle={customMapStylee}
                onRegionChangeComplete={() => {
					getPostsByLocation()
                }}
                >
                {posts.map(post => (
                    <Marker
                        key={post._id}
                        coordinate={{
                            longitude: post.location.coordinates[0],
                            latitude: post.location.coordinates[1],
                        }}
                        onPress={() => {
                            setSelectedPost(post._id)
                            setShowPostInfo(true)
                        }}
                        >
                        {/* <CustomPostMarker post={post} /> */}
                    </Marker>
                ))}
            </MapView>
            {/* <Pressable style={styles.openDrawerButton}/> */}
            {!showMakePost && <TouchableHighlight
                style={styles.postButton}
                title="Add Post"
                onPress={makePost}>
                <Text style={styles.buttonText}>make post</Text>
            </TouchableHighlight>}
            <MakePost
                showMakePost={showMakePost}
                setShowMakePost={setShowMakePost}
            />
            {/* <Button title="Refresh" onPress={() => getPosts()} /> */}
            <PostInfo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    openDrawerButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'orange',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 50,
        height: 50,
        elevation: 5,
    },
    postButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'orange',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
})

const customMapStylee = 
[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]