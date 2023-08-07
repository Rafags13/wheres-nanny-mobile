import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getFocusedRouteNameFromRoute, useNavigation, } from '@react-navigation/native';
import Favorites from '@pages/Favorites';
import Profile from '@pages/Profile';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import HomeNavigationPages from './HomeNavigatorPages';
import Services from '@pages/Services';
import { useContext, useEffect } from 'react';
import messaging from "@react-native-firebase/messaging";
import { ModalContextType, ModalContext } from '@context/ModalContext';
import { ServiceConformationUserDto } from '@models/dto/Service/serviceConfirmationUserDto';

const Tab = createBottomTabNavigator();

export default function CommonUserTab() {
    const navigation = useNavigation<any>();

    function redirectUserToNewServiceChat({ accepted, serviceId }: ServiceConformationUserDto) {
        if (accepted) {
            navigation.navigate('chatDerivatedPages', { serviceId })
            // TODO: Modify to screen to common user
        }
    }

    const { showModal } = useContext(ModalContext) as ModalContextType;
    useEffect(() => {
        messaging().onMessage(async remoteMessage => {
            if (remoteMessage?.data) {
                redirectUserToNewServiceChat({
                    accepted: Boolean(remoteMessage?.data?.accepted),
                    serviceId: Number(remoteMessage?.data?.serviceId)
                })

                showModal({
                    modalType: Boolean(remoteMessage?.data.accepted) ? "success" : "error",
                    message: remoteMessage?.data.message,
                })
            }
        });

        messaging().setBackgroundMessageHandler(async backgroundMessage => {
            if (backgroundMessage) {
                redirectUserToNewServiceChat({
                    accepted: Boolean(backgroundMessage?.data?.accepted),
                    serviceId: Number(backgroundMessage?.data?.serviceId)
                });
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