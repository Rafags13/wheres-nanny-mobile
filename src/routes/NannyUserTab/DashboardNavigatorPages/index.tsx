import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Dashboard from "../../../pages/Dashboard";
import ServiceInformation from "../../../pages/ServiceInformation";

const Stack = createNativeStackNavigator();

export default function DashboardNavigatorPages() {
    return (
        <Stack.Navigator initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="serviceInformation" component={ServiceInformation} />
        </Stack.Navigator>
    )
}