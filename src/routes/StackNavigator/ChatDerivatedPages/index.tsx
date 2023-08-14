import Chat from "@pages/Chat";
import CurrentServiceNanny from "@pages/CurrentServiceNanny";
import CurrentServiceParent from "@pages/CurrentServiceParent";
import WaitingServicePage from "@pages/WaitingService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import socket from "@util/socket";
import { BackHandler } from "react-native";
import { getCurrentService, isInSomeService } from "@storage/index";

const Stack = createNativeStackNavigator();

export default function ChatDerivatedPages() {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        if (isInSomeService()) {
            const currentService = getCurrentService();
            socket.connect();
            socket.emit("select_room", { room: currentService.serviceId });
            console.log('fui chamado')
        }
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