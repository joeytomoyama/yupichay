import PostList from './components/PostList'
import MakePost from './components/MakePost'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList" component={PostList} />
        <Stack.Screen name="MakePost" component={MakePost} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}