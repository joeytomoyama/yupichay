import React, { useState, useEffect } from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { usePosts } from '../contexts/PostsContext'

import * as Location from 'expo-location'

export default function MakePost({ showMakePost, setShowMakePost }) {

    const [isLoading, setLoading] = useState(true)
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [message, setMessage] = useState('')

    const postsState = usePosts()

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                // setErrorMsg('Permission to access location was denied')
                setShowMakePost(false)
                return
            }
        
            const location = await Location.getCurrentPositionAsync({})
            setLongitude(location.coords.longitude)
            setLatitude(location.coords.latitude)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getLocation()
    }, [])

    const makePost = async () => {
        try {
            const newPost = {
                message: message,
                location: {
                    coordinates: [longitude, latitude]
                }
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })
            const json = await response.json()
            postsState.setPosts([...postsState.posts, json])
            
            setShowMakePost(false)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showMakePost}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setShowMakePost(!showMakePost)
                }}>
                <Pressable style={StyleSheet.absoluteFillObject} onPress={() => setShowMakePost(false)}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 24}}>Make Post</Text>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='longitude'
                            style={styles.inputText}
                            onChangeText={text => setLongitude(text)}
                        ></TextInput>
                        <TextInput
                            keyboardType='numeric'
                            placeholder='latitude'
                            style={styles.inputText}
                            onChangeText={text => setLatitude(text)}
                        ></TextInput>
                        <TextInput
                            placeholder='message'
                            style={styles.inputText}
                            onChangeText={text => setMessage(text)}
                        ></TextInput>
                        <Button title="Add Post" onPress={(makePost)} />
                        {/* <Button
                            title="Cancel"
                            onPress={() => setShowMakePost(false)}
                            color="#841584"
                        /> */}
                    </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    // make input text bigger
    inputText: {
        fontSize: 18,
        padding: 5,
    }
  })