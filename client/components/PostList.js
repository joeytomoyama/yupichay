import React, { useState, useEffect } from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import CustomPostMarker from './CustomPostMarker'
import MakePost from './MakePost'
import PostInfo from './PostInfo'

import { useSelectedPost } from '../contexts/SelectedPostContext'
import { useShowPostInfo } from '../contexts/ShowPostInfoContext'
import { usePosts } from '../contexts/PostsContext'

import * as Location from 'expo-location'

export default function PostList({ navigation }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const [showMakePost, setShowMakePost] = useState(false)

    const [isLoading, setLoading] = useState(true)

    const [location, setLocation] = useState({
        coords: {
            latitude: 40.7128,
            longitude: -74.0060,
        }
    })

    const postsContext = usePosts()
    const selectedPostContext = useSelectedPost()
    const showInfoContext = useShowPostInfo()

    const getPosts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/posts`)
            const json = await response.json()
            postsContext.setPosts(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getRoughLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            const location = await Location.getLastKnownPositionAsync({})
            // const location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPosts()
        getRoughLocation()
    }, [])
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                showUserLocation={true}
                customMapStyle={customMapStylee}
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                >
                {postsContext.posts.map(post => (
                    <Marker
                        key={post._id}
                        coordinate={{
                            longitude: post.location.coordinates[0],
                            latitude: post.location.coordinates[1],
                        }}
                        onPress={() => {
                            selectedPostContext.setSelectedPost(post._id)
                            showInfoContext.setShowPostInfo(true)
                        }}
                        >
                        <CustomPostMarker post={post} />
                    </Marker>
                ))}
            </MapView>
            {!showMakePost && <TouchableHighlight
                style={styles.postButton}
                title="Add Post"
                onPress={() => setShowMakePost(true)}>
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