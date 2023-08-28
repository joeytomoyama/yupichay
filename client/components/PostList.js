import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import CustomPostMarker from './CustomPostMarker';
import MakePost from './MakePost';

export default function PostList({ navigation }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [makePostVisible, setMakePostVisible] = useState(false);

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
                    >
                        <CustomPostMarker post={post} />
                    </Marker>
                ))}
            </MapView>
            <TouchableHighlight style={styles.postButton} title="Add Post" onPress={() => setMakePostVisible(true)}>
                <Text style={styles.buttonText}>make post</Text>
            </TouchableHighlight>
            <MakePost posts={posts} setPosts={setPosts} makePostVisible={makePostVisible} setMakePostVisible={setMakePostVisible} />
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