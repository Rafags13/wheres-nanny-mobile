import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Chat from "../../pages/Chat";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { getCurrentUser, getToken } from "../../storage";
import CommonUserTab from "../CommonUserTab";
import NannyUserTab from "../NannyUserTab";

const Stack = createNativeStackNavigator();

const token = getToken();

export default function StackNavigator() {
    const navigator = useNavigation<any>();
    useEffect(() => {
        function findUserLogged() {
            if (token !== '') {
                const currentUser = getCurrentUser();
                if (currentUser.isNanny) {
                    navigator.navigate('nannyUser', { screen: 'dashboard' });
                    return;
                }

                navigator.navigate('commonUser', { screen: 'homeDerivatedPages' });
                return;
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
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
}