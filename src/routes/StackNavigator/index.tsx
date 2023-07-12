import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import { returnRouteNameByProfileType } from "../../assets/util/functions";
import { TypeOfUser } from "../../model/Enums/TypeOfUser";
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
    const currentUser = getCurrentUser();

    useEffect(() => {
        function findUserLogged() {
            if (token !== '') {
                const typeOfUser: TypeOfUser = currentUser.typeOfUser;
                const routeName = returnRouteNameByProfileType(typeOfUser);
                navigator.navigate(routeName.mainContainer, { screen: routeName.screen });
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