import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from "@pages/Profile";
import ServicesNavigatorPages from "./ServicesNavigatorPages";
import { useNavigation } from "@react-navigation/native";
import DashboardNavigatorPages from "./DashboardNavigatorPages";
import { useContext, useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import { ModalContextType, ModalContext } from "@context/ModalContext";
import { AcceptedServiceDto } from "@dtos/Person/AcceptedServiceDto";
import { acceptService } from "@services/requests/NannyRequests";

const Tab = createBottomTabNavigator();

export default function NannyUserTab() {
    const { showModal } = useContext(ModalContext) as ModalContextType;
    const navigator = useNavigation<any>();

    async function onModalServiceResponse(serviceAccepted: boolean, serviceId: string) {
        var acceptedServiceDto: AcceptedServiceDto = {
            serviceId: Number(serviceId),
            accepted: serviceAccepted
        }
        await acceptService(acceptedServiceDto);

        if (serviceAccepted) {
            navigator.navigate('chat');
        }
    }

    useEffect(() => {
        messaging().onMessage(async remoteMessage => {
            if (remoteMessage?.data) {
                showModal({
                    modalType: 'question',
                    message: remoteMessage?.data.message,
                    function: (value: any) => onModalServiceResponse(value, remoteMessage?.data?.serviceId as string)
                });
            }
        });

        messaging().getInitialNotification().then(initialMessage => {
            if (initialMessage?.data?.mensagem) {
                showModal({ modalType: 'question', message: initialMessage?.data?.message as string, function: test });
            }
        });

    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#3E9FEB',
                tabBarInactiveTintColor: '#c4c4c4',
            }}
            initialRouteName="dashboard"
        >
            <Tab.Screen name="dashboardNavigator" component={DashboardNavigatorPages} options={{
                tabBarIcon: (props) => (
                    <Entypo name="circular-graph" size={24} color={props.color} />
                )
            }} />

            <Tab.Screen name="myServices" component={ServicesNavigatorPages} options={({ route }) => ({
                tabBarIcon: (props) => (
                    <MaterialCommunityIcons name="human-baby-changing-table" size={24} color={props.color} />
                ),
            })}
            />

            <Tab.Screen name="nanny-profile" component={Profile} options={{
                tabBarIcon: (props) => (
                    <AntDesign name="idcard" size={24} color={props.color} />
                ),
            }}
            />

        </Tab.Navigator>
    )
}