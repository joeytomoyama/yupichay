import { createDrawerNavigator } from '@react-navigation/drawer'
import PostList from './PostList'

const Drawer = createDrawerNavigator()

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={PostList} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  )
}