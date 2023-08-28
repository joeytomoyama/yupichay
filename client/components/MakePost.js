import React, { useState, useEffect } from 'react'
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function MakePost({ posts, setPosts, makePostVisible, setMakePostVisible }) { //
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    // const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState('')

    const makePost = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    location: {
                        coordinates: [latitude, longitude]
                    }
                })
            })
            const json = await response.json()
            setPosts([...posts, json])
            // navigation.navigate('PostList')
            setMakePostVisible(false)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <View>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={makePostVisible}
                // onRequestClose={() => {
                //     Alert.alert('Modal has been closed.');
                //     setMakePostVisible(!makePostVisible);
                // }}
            >
                <Text>Make Post</Text>
                <TextInput
                    id='latitudeText'
                    placeholder='latitude'
                    onChangeText={text => setLatitude(text)}
                ></TextInput>
                <TextInput
                    id='longitudeText'
                    placeholder='longitude'
                    onChangeText={text => setLongitude(text)}
                ></TextInput>
                <TextInput
                    id='messageText'
                    placeholder='message'
                    onChangeText={text => setMessage(text)}
                ></TextInput>
                <Button title="Add Post" onPress={(makePost)} />
            </Modal> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={makePostVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setMakePostVisible(!makePostVisible);
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setMakePostVisible(!makePostVisible)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable> */}
                    <Text>Make Post</Text>
                    <TextInput
                        id='latitudeText'
                        placeholder='latitude'
                        onChangeText={text => setLatitude(text)}
                    ></TextInput>
                    <TextInput
                        id='longitudeText'
                        placeholder='longitude'
                        onChangeText={text => setLongitude(text)}
                    ></TextInput>
                    <TextInput
                        id='messageText'
                        placeholder='message'
                        onChangeText={text => setMessage(text)}
                    ></TextInput>
                    <Button title="Add Post" onPress={(makePost)} />
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
      marginTop: 22,
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
  });