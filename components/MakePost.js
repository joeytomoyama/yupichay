import React, { useState, useEffect } from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { usePosts } from '../contexts/PostsContext'

import { getLocation } from './util'
import { useLocation } from '../contexts/LocationContext'

export default function MakePost({ showMakePost, setShowMakePost }) {

    const [isLoading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [developerMode, setDeveloperMode] = useState(false)

    const { posts, setPosts } = usePosts()
    const { location, setLocation } = useLocation()
    
    useEffect(() => {
        getLocation(setLocation)
    }, [])

    const makePost = async () => {
        try {
            const newPost = {
                message,
                location: {
                    coordinates: [location.longitude, location.latitude]
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
            setPosts([...posts, json])
            
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
                        {developerMode && (<>
                            <TextInput
                                style={styles.inputText}
                                keyboardType='numeric'
                                placeholder='longitude'
                                placeholderTextColor={'white'}
                                onChangeText={text => setLongitude(text)}
                            ></TextInput>
                            <TextInput
                                style={styles.inputText}
                                keyboardType='numeric'
                                placeholder='latitude'
                                placeholderTextColor={'white'}
                                onChangeText={text => setLatitude(text)}
                            ></TextInput>
                        </>)}
                        <TextInput
                            style={styles.inputText}
                            placeholder='message'
                            placeholderTextColor={'white'}
                            onChangeText={text => setMessage(text)}
                        ></TextInput>
                        <Pressable
                            style={styles.button}
                            onPress={makePost}
                            onLongPress={() => setDeveloperMode(!developerMode)}
                        >
                            <Text style={styles.addPostText}>Add Post</Text>
                        </Pressable>
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
      backgroundColor: 'orange',
      borderRadius: 20,
      padding: 15,
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
      borderRadius: 5,
      padding: 10,
      elevation: 2,
        backgroundColor: 'white',
    },
    addPostText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    // make input text bigger
    inputText: {
        fontSize: 18,
        padding: 5,
        color: 'white',
    }
  })