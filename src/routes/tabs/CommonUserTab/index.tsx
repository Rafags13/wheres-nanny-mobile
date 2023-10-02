import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CommonActions, getFocusedRouteNameFromRoute, useNavigation, } from '@react-navigation/native';
import Favorites from '@pages/Favorites';
import Profile from '@pages/Profile';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import HomeNavigationPages from './HomeNavigatorPages';
import Services from '@pages/Services';
import { useContext, useEffect, useMemo } from 'react';
import messaging from "@react-native-firebase/messaging";
import { ModalContextType, ModalContext, ModalType } from '@context/ModalContext';
import { ServiceConformationUserDto } from '@models/dto/Service/serviceConfirmationUserDto';
import { onNotWaitingNannyResponseAnymore, isInSomeService, getCurrentService, onServiceAccept, clearCurrentService } from '@storage/index';

const Tab = createBottomTabNavigator();

type redirectProps = {
    accepted: boolean,
    serviceId: number
}

export default function CommonUserTab() {
    const navigation = useNavigation<any>();

    function redirectUserIfAccepts({ accepted, serviceId }: redirectProps) {
        if (!accepted) {
            navigation.navigate('commonUser', { screen: 'home', initial: true, });
            clearCurrentService();
            return;
        }

        navigation.replace("chatDerivatedPages", { screen: 'currentServiceParent', params: { serviceId: serviceId } });
        onServiceAccept(serviceId);
        onNotWaitingNannyResponseAnymore();
    }

    const { showModal } = useContext(ModalContext) as ModalContextType;

    function onRecievedNotification(remoteData: any) {
        const response = JSON.parse(remoteData.response);

        showModal({
            modalType: response.accepted ? ModalType.SUCCESS : ModalType.ERROR,
            message: remoteData.message,
        })

        redirectUserIfAccepts({ accepted: response.accepted, serviceId: Number(response.serviceId) })
    }

    // TODO: See if its possible do a better code then this
    useEffect(() => {
        messaging().onMessage(async remoteMessage => {
            if (remoteMessage?.data) {
                onRecievedNotification(remoteMessage?.data);
            }

        });

        messaging().setBackgroundMessageHandler(async backgroundMessage => {
            if (backgroundMessage) {
                onRecievedNotification(backgroundMessage?.data);
            }
        })
    }, []);

    return (
        <Provider store={store}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3E9FEB',
                    tabBarInactiveTintColor: '#c4c4c4',
                }}
                initialRouteName="homeDerivatedPages"
            >
                <Tab.Screen name="homeDerivatedPages" component={HomeNavigationPages} options={({ route }) => ({
                    tabBarIcon: (props) => (
                        <Fontisto name="home" size={24} color={props.color} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                        if (routeName === 'nannyInformation' || routeName === 'serviceInformation') {
                            return { display: "none" }
                        }
                        return
                    })(route),
                })} />
                <Tab.Screen name="favorites" component={Favorites} options={{
                    tabBarIcon: (props) => (
                        <AntDesign name="heart" size={24} color={props.color} />
                    )
                }} />
                <Tab.Screen name="services" component={Services} options={{
                    tabBarIcon: (props) => (
                        <FontAwesome5 name="baby" size={24} color={props.color} />
                    )
                }} />
                <Tab.Screen name="profile" component={Profile} options={{
                    tabBarIcon: (props) => (
                        <AntDesign name="idcard" size={24} color={props.color} />
                    ),
                }} />
            </Tab.Navigator>
        </Provider>
    )
}