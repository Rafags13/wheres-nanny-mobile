import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home';
import Fontisto from 'react-native-vector-icons/Fontisto';


const Tab = createBottomTabNavigator();

export default function LoggedTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="home" component={Home} options={{
                tabBarIcon: () => (
                    <Fontisto name="home" size={24} />
                )
            }} />
        </Tab.Navigator>
    )
}