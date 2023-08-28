import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import CustomPostMarker from './CustomPostMarker';

export default function PostList({ navigation }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)

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
        <View style={styles.container}>
            {/* <ScrollView>
                {posts.map(post => (
                    <Text key={post._id}>{`x: ${post.location.coordinates[0]}, y: ${post.location.coordinates[1]}, message: ${post.message}`}</Text>
                ))}
            </ScrollView> */}
            <MapView style={styles.map} showUserLocation={true}>
                {posts.map(post => (
                    <Marker
                        key={post._id}
                        coordinate={{
                            latitude: post.location.coordinates[0],
                            longitude: post.location.coordinates[1]
                        }}
                        // title={post.message}
                    >
                        <CustomPostMarker post={post} />
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.postButton} title="Add Post" onPress={() => navigation.navigate('MakePost')}>
                <Text style={styles.buttonText}>make post</Text>
            </TouchableOpacity>
            {/* <Button title="Refresh" onPress={() => getPosts()} /> */}
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
        bottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
  })