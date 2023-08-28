import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function MakePost({ navigation }) { //
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
            // setPosts([...posts, json])
            navigation.navigate('PostList')
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <View>
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
    )
}