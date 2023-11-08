import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { returnRouteNameByProfileType } from "@util/functions";
import { TypeOfUser } from "@enums/TypeOfUser";
import Login from "@pages/Login";
import Register from "@pages/Register";
import { getCurrentService, getCurrentUserAsync, getTokenAsync, isInSomeService } from "@storage/index";
import CommonUserTab from "@tabs/CommonUserTab";
import NannyUserTab from "@tabs/NannyUserTab";
import ChatDerivatedPages from "./ChatDerivatedPages";
import messaging from '@react-native-firebase/messaging';
import { TypeOfNotification } from "@enums/TypeOfNotification";
import { ModalType, useModal } from "@context/ModalContext";

const Stack = createNativeStackNavigator();

const token = getTokenAsync();

export default function StackNavigator() {
    const navigator = useNavigation<any>();
    const currentUser = getCurrentUserAsync();

    function redirectIfIsInService() {
        if (!isInSomeService()) return;

        const currentService = getCurrentService();
        if (currentService.waitingResponse) {
            navigator.navigate('chatDerivatedPages', {
                screen: 'waitingService'
            });
            return;
        }

        navigator.navigate("chatDerivatedPages", {
            screen: 'currentService',
        });
    }

    useEffect(() => {
        function findUserLogged() {
            if (token !== '') {
                if (!isInSomeService()) {
                    const typeOfUser: TypeOfUser = currentUser.typeOfUser;
                    const routeName = returnRouteNameByProfileType(typeOfUser);
                    navigator.navigate(routeName.mainContainer, { screen: routeName.screen });
                    return;
                }
                redirectIfIsInService();
            }
        }
        findUserLogged();
    }, []);

    return (
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="commonUser" component={CommonUserTab} />
            <Stack.Screen name="nannyUser" component={NannyUserTab} />
            <Stack.Screen name="chatDerivatedPages" component={ChatDerivatedPages} />
        </Stack.Navigator>
    )
}