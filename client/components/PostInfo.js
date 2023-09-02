import React from 'react'
import { View, StyleSheet, Text, Modal, Button } from 'react-native'
import { usePosts } from '../contexts/PostsContext'
import { useSelectedPost } from '../contexts/SelectedPostContext'
import { useShowPostInfo } from '../contexts/ShowPostInfoContext'

export default function PostInfo() {
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const postsState =  usePosts()
    const showInfoContext = useShowPostInfo()
    const selectedPost = useSelectedPost().selectedPost

    const likePost = async () => {
        try {
            console.log("id: " + JSON.stringify(selectedPost))
            const response = await fetch(`${apiBaseUrl}/posts/${selectedPost.clickedPost._id}/like`, {
                method: 'PUT',
            })
            // const json = await response.json()
            console.log(response)
            postsState.posts.map(post => {
                if (post._id === selectedPost._id) {
                    post.likes++
                }
            })
        } catch (error) {
            // console.error(error)
        }
    }

    const deletePost = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/posts/${selectedPost._id}`, {
                method: 'DELETE',
            })
            // const json = await response.json()
            console.log(response)
            postsState.setPosts(postsState.posts.filter(post => post._id !== selectedPost._id))
            // postsState.setPosts((posts) => posts.filter(post => post._id !== selectedPost._id))
            closePostInfo()
        } catch (error) {
            // console.error(error)
        }
    }

    const closePostInfo = () => showInfoContext.setShowPostInfo(false)

    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showInfoContext.showPostInfo}>
                <View style={styles.drawer}>
                    <Text>{`Message: ${selectedPost?.message ?? null}`}</Text>
                    <Text>{`Author: Joey`}</Text>
                    <Text>{`Likes: ${selectedPost?.likes ?? null}`}</Text>
                    <Text>{"info: " + showInfoContext.showPostInfo}</Text>
                    <Button
                        title={"like"}
                        onPress={likePost}
                    />
                    <Button
                        title={"delete"}
                        onPress={deletePost}
                    />
                    <Button
                        title={"close"}
                        onPress={closePostInfo}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   alignItems: 'center',
    //   width: '100%',
    //   height: '100%',
    },
    drawer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        height: '30%',
        width: '100%',
    }
})