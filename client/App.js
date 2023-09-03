import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import PostList from './components/PostList'
import MakePost from './components/MakePost'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SelectedPostProvider } from './contexts/SelectedPostContext'
import { ShowPostInfoProvider } from './contexts/ShowPostInfoContext'
import { PostsProvider } from './contexts/PostsContext'
// import MyDrawer from './components/Drawer'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PostsProvider>
    <SelectedPostProvider>
    <ShowPostInfoProvider>
      <NavigationContainer>
        {/* <MyDrawer /> */}
        <Stack.Navigator>
            <Stack.Screen name="PostList" component={PostList} />
            <Stack.Screen name="MakePost" component={MakePost} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShowPostInfoProvider>
    </SelectedPostProvider>
    </PostsProvider>
  )
}