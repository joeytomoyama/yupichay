import React, { useState, useEffect } from 'react'
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'

export default function MakePost({ posts, setPosts, showMakePost, setShowMakePost }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const [isLoading, setLoading] = useState(true)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('')

    const makePost = async () => {
        try {
            const newPost = {
                message: message,
                location: {
                    coordinates: [longitude, latitude]
                }
            }
            const response = await fetch(`${apiBaseUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })
            const json = await response.json()
            setPosts([...posts, json])
            // navigation.navigate('PostList')
            setShowMakePost(false)
        } catch (error) {
            console.log(longitude, latitude)
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
                    Alert.alert('Modal has been closed.');
                    setShowMakePost(!showMakePost);
                }}>
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
                    <Button
                        title="Cancel"
                        onPress={() => setShowMakePost(false)}
                        color="#841584"
                    />
                </View>
                </View>
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
  });