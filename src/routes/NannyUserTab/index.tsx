import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Dashboard from "../../pages/Dashboard";
import MyServices from "../../pages/MyServices";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from "../../pages/Profile";
import ServicesNavigatorPages from "./ServicesNavigatorPages";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import DashboardNavigatorPages from "./DashboardNavigatorPages";

const Tab = createBottomTabNavigator();

export default function NannyUserTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#3E9FEB',
                tabBarInactiveTintColor: '#c4c4c4',
            }}
            initialRouteName="dashboard"
        >
            <Tab.Screen name="dashboardNavigator" component={DashboardNavigatorPages} options={{
                tabBarIcon: (props) => (
                    <Entypo name="circular-graph" size={24} color={props.color} />
                )
            }} />

            <Tab.Screen name="myServices" component={ServicesNavigatorPages} options={({ route }) => ({
                tabBarIcon: (props) => (
                    <MaterialCommunityIcons name="human-baby-changing-table" size={24} color={props.color} />
                ),
            })}
            />

            <Tab.Screen name="nanny-profile" component={Profile} options={{
                tabBarIcon: (props) => (
                    <AntDesign name="idcard" size={24} color={props.color} />
                ),
            }}
            />

        </Tab.Navigator>
    )
}