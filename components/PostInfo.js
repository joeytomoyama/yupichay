import React from 'react'
import { View, StyleSheet, Text, Modal, Button, Pressable } from 'react-native'
import { usePosts } from '../contexts/PostsContext'
import { useSelectedPost } from '../contexts/SelectedPostContext'
import { useShowPostInfo } from '../contexts/ShowPostInfoContext'

export default function PostInfo() {
    const { posts, setPosts }=  usePosts()
    const { showPostInfo, setShowPostInfo }= useShowPostInfo()
    const selectedPostId = useSelectedPost().selectedPost

    const selectedPost = posts?.find(post => post._id === selectedPostId)

    const likePost = async () => {
        try {
            console.log("id: " + JSON.stringify(selectedPostId))
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/${selectedPostId}/like`, {
                method: 'PUT',
            })

            setPosts((posts) => posts.map(post => {
                if (post._id === selectedPostId) {
                    return { ...post, likes: post.likes + 1 }
                }
                return post
            }))
        } catch (error) {
            console.error(error)
        }
    }

    const deletePost = async () => {
        try {
            await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/${selectedPost._id}`, {
                method: 'DELETE',
            })

            setPosts(posts.filter(post => post._id !== selectedPostId))
            // setPosts((posts) => posts.filter(post => post._id !== selectedPost._id))
            closePostInfo()
        } catch (error) {
            // console.error(error)
        }
    }

    const closePostInfo = () => setShowPostInfo(false)

    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPostInfo}
                onRequestClose={closePostInfo}
                >
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={closePostInfo}
                    >
                <View style={styles.drawer}>
                    <Text style={styles.messageText}>{selectedPost?.message}</Text>
                    <Text>{`Author: Joey`}</Text>
                    <Text>{`Likes: ${selectedPost?.likes}`}</Text>
                    <Pressable
                        style={styles.pressableContainer}
                        onPress={likePost}
                    >
                        <Text style={styles.buttonText}>Like</Text>
                    </Pressable>
                    <Pressable
                        style={styles.pressableContainer}
                        onPress={deletePost}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
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
    },
    messageText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pressableContainer: {
        width: '80%',
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})