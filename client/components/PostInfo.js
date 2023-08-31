import React, { useContext } from 'react'
import { View, StyleSheet, Text, Modal, Button } from 'react-native'
import { ClickedPostContext, OpenPostInfoContext } from './PostList'

export default function PostInfo() {
    const openPostInfo = useContext(OpenPostInfoContext)
    const lastClickedPost = useContext(ClickedPostContext)

    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={openPostInfo.showPostInfo}>
                {/* visible={false}> */}
                <View style={styles.drawer}>
                    <Text>{`Message: ${lastClickedPost.clickedPost}`}</Text>
                    <Text>PostAuthor</Text>
                    <Text>{"info: " + openPostInfo.showPostInfo}</Text>
                    <Button
                        title={"close"}
                        onPress={() => openPostInfo.setShowPostInfo(false)}
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