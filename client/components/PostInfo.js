import React, { useContext } from 'react'
import { View, StyleSheet, Text, Modal, Button } from 'react-native'
import { ClickedPostContext, ShowInfoContext } from './PostList'

export default function PostInfo() {
    const apiBaseUrl = 'http://192.168.0.244:3000/api'

    const showInfoContext = useContext(ShowInfoContext)
    const lastClickedPost = useContext(ClickedPostContext).clickedPost

    const likePost = async () => {
        try {
            console.log("id: " + lastClickedPost._id)
            const response = await fetch(`${apiBaseUrl}/posts/${lastClickedPost.clickedPost._id}/like`, {
                method: 'PUT',
            })
            // const json = await response.json()
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePost = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/posts/${lastClickedPost._id}`, {
                method: 'DELETE',
            })
            // const json = await response.json()
            console.log(response)
        } catch (error) {
            console.error(error)
        }
        console.log('deletePost')
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
                    <Text>{`Message: ${lastClickedPost?.message ?? null}`}</Text>
                    <Text>{`Author: Joey`}</Text>
                    <Text>{`Likes: ${lastClickedPost?.likes ?? null}`}</Text>
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