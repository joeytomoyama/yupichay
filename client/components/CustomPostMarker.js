import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CustomPostMarker({ post }) {
    return (
        <View style={styles.customPostMarker}>
            <Text>{post.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    customPostMarker: {
        backgroundColor: 'white',
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
    },
})