import Chat from "@pages/Chat";
import CurrentService from "@pages/CurrentService";
import WaitingServicePage from "@pages/WaitingService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import socket from "@util/socket";
import { BackHandler } from "react-native";
import { clearCurrentService, getCurrentService, getCurrentUserAsync, isInSomeService, onNotWaitingNannyResponseAnymore, onServiceAccept } from "@storage/index";
import messaging from '@react-native-firebase/messaging';
import { ModalType, useModal } from "@context/ModalContext";
import { TypeOfNotification } from "@enums/TypeOfNotification";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { TypeOfUser } from "@enums/TypeOfUser";

const Stack = createNativeStackNavigator();

export default function ChatDerivatedPages() {
    const { showModal } = useModal();
    const navigation = useNavigation<any>();
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
            <Stack.Screen name="currentService" component={CurrentService} />
            <Stack.Screen name="waitingService" component={WaitingServicePage} />
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
}