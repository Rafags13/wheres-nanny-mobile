import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import Favorites from '../../pages/Favorites';
import Profile from '../../pages/Profile';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import HomeNavigationPages from './HomeNavigatorPages';
import Services from '../../pages/Services';


const Tab = createBottomTabNavigator();

export default function CommonUserTab() {

    return (
        <Provider store={store}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3E9FEB',
                    tabBarInactiveTintColor: '#c4c4c4',
                }}
                initialRouteName="homeDerivatedPages"
            >
                <Tab.Screen name="homeDerivatedPages" component={HomeNavigationPages} options={({ route }) => ({
                    tabBarIcon: (props) => (
                        <Fontisto name="home" size={24} color={props.color} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                        if (routeName === 'nannyInformation') {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })} />
                <Tab.Screen name="favorites" component={Favorites} options={{
                    tabBarIcon: (props) => (
                        <AntDesign name="heart" size={24} color={props.color} />
                    )
                }} />
                <Tab.Screen name="services" component={Services} options={{
                    tabBarIcon: (props) => (
                        <FontAwesome5 name="baby" size={24} color={props.color} />
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