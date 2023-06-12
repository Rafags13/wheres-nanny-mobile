import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Dashboard from "../../pages/Dashboard";

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
            <Tab.Screen name="dashboard" component={Dashboard} options={{
                tabBarIcon: (props) => (
                    <Entypo name="circular-graph" size={24} color={props.color} />
                )
            }} />
        </Tab.Navigator>
    )
}