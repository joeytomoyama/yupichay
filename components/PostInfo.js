import React from 'react'
import { View, StyleSheet, Text, Modal, Button, Pressable } from 'react-native'
import { usePosts } from '../contexts/PostsContext'
import { useSelectedPost } from '../contexts/SelectedPostContext'
import { useShowPostInfo } from '../contexts/ShowPostInfoContext'

export default function PostInfo() {
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const postsState =  usePosts()
    const showInfoContext = useShowPostInfo()
    const selectedPostId = useSelectedPost().selectedPost

    const selectedPost = postsState.posts.find(post => post._id === selectedPostId)

    const likePost = async () => {
        try {
            console.log("id: " + JSON.stringify(selectedPostId))
            await fetch(`${apiBaseUrl}/posts/${selectedPostId}/like`, {
                method: 'PUT',
            })

            postsState.setPosts((posts) => posts.map(post => {
                if (post._id === selectedPostId) {
                    return { ...post, likes: post.likes + 1 }
                }
                return post
            }))
        } catch (error) {
            // console.error(error)
        }
    }

    const deletePost = async () => {
        try {
            await fetch(`${apiBaseUrl}/posts/${selectedPost._id}`, {
                method: 'DELETE',
            })

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
                visible={showInfoContext.showPostInfo}
                onRequestClose={closePostInfo}
                >
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={closePostInfo}
                    >
                <View style={styles.drawer}>
                    <Text>{`Message: ${selectedPost?.message}`}</Text>
                    <Text>{`Author: Joey`}</Text>
                    <Text>{`Likes: ${selectedPost?.likes}`}</Text>
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
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
    //   width: '100%',
    //   height: '100%',
    },
    fill: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        // opacity: 0,
    },
    drawer: {
        height: '30%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        bottom: 0,
        backgroundColor: 'white',
        elevation: 5,
    }
})