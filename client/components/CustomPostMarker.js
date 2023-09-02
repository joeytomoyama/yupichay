import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CustomPostMarker({ post }) {
    return (
        <View style={styles.customPostMarker}>
            <Text style={styles.postMarkerText}>{post.message.length > 10 ? `${post.message.substring(0, 21)}...` : post.message}</Text>
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
        borderColor: 'white',
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