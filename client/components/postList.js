import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function PostList({ navigation }) { //
    const apiBaseUrl = 'http://172.16.48.159:3000/api'

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
        <View>
            <Text>Post List</Text>
            <ScrollView>
                {posts.map(post => (
                    <Text key={post._id}>{`x: ${post.location.coordinates[0]}, y: ${post.location.coordinates[1]}, message: ${post.message}`}</Text>
                ))}
            </ScrollView>
            <Button title="Add Post" onPress={() => navigation.navigate('MakePost')} />
            <Button title="Refresh" onPress={() => getPosts()} />
        </View>
    )
}