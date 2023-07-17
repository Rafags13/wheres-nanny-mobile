import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyServices from "@pages/MyServices";
import ServiceInformation from "@pages/ServiceInformation";

const Stack = createNativeStackNavigator();

export default function ServicesNavigatorPages() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='services'>
            <Stack.Screen name="services" component={MyServices} />
            <Stack.Screen name="serviceInformation" component={ServiceInformation} />
        </Stack.Navigator>
    );
}