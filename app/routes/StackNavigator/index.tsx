import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { getToken } from "../../storage";
import LoggedTab from "../LoggedTab";

const Stack = createNativeStackNavigator();

const token = getToken();

export default function StackNavigator() {
    const navigator = useNavigation<any>();
    useEffect(() => {
        async function findUserLogged() {
            if (token) {
                navigator.navigate('logged', { screen: 'home' });
            }
        }

        findUserLogged();
    }, []);

    return (
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="logged" component={LoggedTab} />
        </Stack.Navigator>
    )
}