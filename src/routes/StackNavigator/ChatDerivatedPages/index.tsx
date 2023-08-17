import Chat from "@pages/Chat";
import CurrentService from "@pages/CurrentService";
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
            if (!currentService.waitingResponse) {
                socket.connect();
                socket.emit("select_room", { room: currentService.serviceId });
            }
        }
    }, []);

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName='waitingService'
        >
            <Stack.Screen name="currentServiceNanny" component={CurrentService} />
            <Stack.Screen name="waitingService" component={WaitingServicePage} />
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
}