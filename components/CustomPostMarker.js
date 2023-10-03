import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CustomPostMarker({ post }) {
    const maxMessageLength = 21
    return (
        <View style={styles.customPostMarker}>
            {/* <Text style={styles.postMarkerText}>{post.message.length > 10 ? `${post.message.substring(0, 21)}...` : post.message}</Text> */}
            <Text style={styles.postMarkerText}>{post.message.length > maxMessageLength ? `${post.message.substring(0, maxMessageLength)}...` : post.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    customPostMarker: {
        backgroundColor: 'orange',
        padding: 3,
        maxWidth: 100,
        // maxHeight: 100,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 5,
        elevation: 5,
    },
    postMarkerText: {
        color: 'white',
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
    },
})