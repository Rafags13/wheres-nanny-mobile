import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { storage } from '../../storage';


const Tab = createBottomTabNavigator();

export default function LoggedTab() {
    const navigator = useNavigation();

    useEffect(() => {
        navigator.addListener('beforeRemove', (e) => {
            e.preventDefault();
            BackHandler.exitApp();
        })
    }, []);

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