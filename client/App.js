import PostList from './components/PostList'
import MakePost from './components/MakePost'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SelectedPostProvider } from './contexts/SelectedPostContext'
import { ShowPostInfoProvider } from './contexts/ShowPostInfoContext'
import { PostsProvider } from './contexts/PostsContext'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PostsProvider>
    <SelectedPostProvider>
    <ShowPostInfoProvider>
      <NavigationContainer>
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