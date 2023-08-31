import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ClickedPostContext, OpenPostInfoContext } from './PostList'

export default function CustomPostMarker({ post }) {
    const openPostInfo = useContext(OpenPostInfoContext)
    const clickedPost = useContext(ClickedPostContext)

    return (
        <View style={styles.customPostMarker}>
            <Text style={styles.postMarkerText}>{post.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    customPostMarker: {
        backgroundColor: 'orange',
        padding: 3,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    postMarkerText: {
        color: 'white',
    },
})