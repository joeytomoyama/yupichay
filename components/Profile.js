import React, { useState, useEffect } from 'react'
import { Button, ScrollView, Text, View } from 'react-native'

export default function Profile({ navigation }) { //

	const [posts, setPosts] = useState([])
	const [isLoading, setLoading] = useState(true)

	const getPosts = async () => {
		try {
			const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/all`)
			if (response.status !== 200) return
			const json = await response.json()
			setPosts(json)
		} catch (error) {
			console.error("Profile " + error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getPosts()
	}, [])
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Post List</Text>
			<ScrollView>
				{posts.map(post => (
					<Text key={post._id}>{`x: ${post.location.coordinates[0]}, y: ${post.location.coordinates[1]}, message: ${post.message}`}</Text>
				))}
				{/* <Button title="Add Post" onPress={() => navigation.navigate('MakePost')} /> */}
				<Button title="Refresh" onPress={() => getPosts()} />
        		<Button onPress={() => navigation.goBack()} title="Go back home" />
			</ScrollView>
		</View>
	)
}