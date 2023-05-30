import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { storage } from '../../storage';
import Favorites from '../../pages/Favorites';
import Profile from '../../pages/Profile';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../../app/store';
import { loadInitialHomeInformation } from '../../features/listNannySlice';


const Tab = createBottomTabNavigator();

export default function LoggedTab() {

    return (
        <Provider store={store}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3E9FEB',
                    tabBarInactiveTintColor: '#c4c4c4'
                }}

            >
                <Tab.Screen name="home" component={Home} options={{
                    tabBarIcon: (props) => (
                        <Fontisto name="home" size={24} color={props.color} />
                    )
                }} />
                <Tab.Screen name="favorites" component={Favorites} options={{
                    tabBarIcon: (props) => (
                        <AntDesign name="heart" size={24} color={props.color} />
                    )
                }} />
                <Tab.Screen name="profile" component={Profile} options={{
                    tabBarIcon: (props) => (
                        <Ionicons name="person" size={24} color={props.color} />
                    )
                }} />
            </Tab.Navigator>
        </Provider>
    )
}