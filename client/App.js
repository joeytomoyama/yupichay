import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import PostList from './components/postList'
import MakePost from './components/MakePost'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList" component={PostList} />
        <Stack.Screen name="MakePost" component={MakePost} />
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <Text>Easy</Text>
        <PostList />
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
