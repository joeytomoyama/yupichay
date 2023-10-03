import 'react-native-gesture-handler'
import React from 'react'
// import { TouchableOpacity, Text } from 'react-native'
import PostList from './components/PostList'
import Profile from './components/Profile'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SelectedPostProvider } from './contexts/SelectedPostContext'
import { ShowPostInfoProvider } from './contexts/ShowPostInfoContext'
import { PostsProvider } from './contexts/PostsContext'
import { LocationProvider } from './contexts/LocationContext'
import { RegionProvider } from './contexts/RegionContext'

import { createDrawerNavigator } from '@react-navigation/drawer'

// const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    // <PostsProvider>
    // <SelectedPostProvider>
    // <ShowPostInfoProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //         <Stack.Screen name="PostList" component={PostList} />
    //         <Stack.Screen name="MakePost" component={MakePost} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </ShowPostInfoProvider>
    // </SelectedPostProvider>
    // </PostsProvider>
    <PostsProvider>
    <SelectedPostProvider>
    <ShowPostInfoProvider>
    <LocationProvider>
    <RegionProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="PostList">
            <Drawer.Screen
              name="PostList"
              component={PostList}
              options={{
                headerTransparent: true,
                headerTitle: '',  // Optionally hide the title
                headerTintColor: 'black',  // Adjust color for back button, etc.
                // headerLeft: (props) =>  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ padding: 10, backgroundColor: 'orange', margin: 10, borderRadius: 5 }}>
                //                           <Text style={{ color: 'white' }}>☰</Text>
                //                         </TouchableOpacity>
            }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
            />
        </Drawer.Navigator>
      </NavigationContainer>
    </RegionProvider>
    </LocationProvider>
    </ShowPostInfoProvider>
    </SelectedPostProvider>
    </PostsProvider>
  )
}