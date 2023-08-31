import React, { useState, useEffect, useContext, createContext } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import CustomPostMarker from './CustomPostMarker';
import MakePost from './MakePost';
import PostInfo from './PostInfo';


export const ClickedPostContext = createContext(null)
export const OpenPostInfoContext = createContext(false)

export default function PostList({ navigation }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [showMakePost, setShowMakePost] = useState(false)
    const [showPostInfo, setShowPostInfo] = useState(false)
    const [clickedPost, setClickedPost] = useState(null)

    const getPosts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/posts`)
            const json = await response.json()
            setPosts(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    
    return (
        <ClickedPostContext.Provider value={{ clickedPost, setClickedPost }}>
        <OpenPostInfoContext.Provider value={{ showPostInfo, setShowPostInfo }}>
        <View style={styles.container}>
            <MapView style={styles.map} showUserLocation={true} customMapStyle={customMapStylee}>
                {posts.map(post => (
                    <Marker
                        key={post._id}
                        coordinate={{
                            longitude: post.location.coordinates[0],
                            latitude: post.location.coordinates[1],
                        }}
                        onPress={() => {
                          setShowPostInfo(true)
                          setClickedPost(post.message)
                          // setClickedPost(post => ({
                          //   ...post
                          // }))
                        }}
                        >
                        <CustomPostMarker post={post} />
                    </Marker>
                ))}
            </MapView>
            {!showMakePost && <TouchableHighlight style={styles.postButton} title="Add Post" onPress={() => setShowMakePost(true)}>
                <Text style={styles.buttonText}>make post</Text>
            </TouchableHighlight>}
            <MakePost posts={posts} setPosts={setPosts} showMakePost={showMakePost} setShowMakePost={setShowMakePost} />
            {/* <Button title="Refresh" onPress={() => getPosts()} /> */}
            <PostInfo />
        </View>
        </OpenPostInfoContext.Provider>
        </ClickedPostContext.Provider>
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
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
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