import Chat from "@pages/Chat";
import CurrentServiceNanny from "@pages/CurrentServiceNanny";
import CurrentServiceParent from "@pages/CurrentServiceParent";
import WaitingServicePage from "@pages/WaitingService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const Stack = createNativeStackNavigator();

export default function ChatDerivatedPages() {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName='waitingService'
        >
            <Stack.Screen name="currentServiceNanny" component={CurrentServiceNanny} />
            <Stack.Screen name="currentServiceParent" component={CurrentServiceParent} />
            <Stack.Screen name="waitingService" component={WaitingServicePage} />
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
}