import { Background } from "@components/Background";
import { ModalContext, ModalContextType, ModalType, useModal } from "@context/ModalContext";
import { TypeOfUser } from "@enums/TypeOfUser";
import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addCurrentServiceToAsync, clearCurrentService, getCurrentUserAsync, onNotWaitingNannyResponseAnymore, onServiceAccept } from "@storage/index";
import { globalStyles, text } from "@styles/global.styles";
import AnimatedLottieView from "lottie-react-native";
import moment from "moment";
import { useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import messaging from '@react-native-firebase/messaging';
import { TypeOfNotification } from "@enums/TypeOfNotification";

export default function WaitingService() {
    const navigator = useNavigation<any>();
    const { showModal } = useModal();

    function redirectUserIfAccepts({ serviceId }: { serviceId: number }) {
        navigator.replace("chatDerivatedPages", { screen: 'currentService', params: { serviceId: serviceId } });
        onServiceAccept(serviceId);
        onNotWaitingNannyResponseAnymore();
    }

    useEffect(() => {

        function sendUserIfNannyAccepts() {
            messaging().onMessage((remoteMessage) => {
                if (remoteMessage?.data?.typeOfNotification === TypeOfNotification.Positive.toString()) {
                    const response = JSON.parse(remoteMessage?.data?.response as string);

                    showModal({
                        modalType: ModalType.SUCCESS,
                        message: response.message,
                    })

                    redirectUserIfAccepts({ serviceId: Number(response.serviceId) })
                }
            })
        }
        addCurrentServiceToAsync({
            waitingResponse: true,
            messages: []
        });

        const fiveMinutes = 300000;
        const timeOut = setTimeout(() => {
            navigator.navigate('commonUser', { screen: 'home', initial: true, });
            showModal({ modalType: ModalType.ERROR, message: 'A babá não aceitou o serviço a tempo, tente novamente.' });
            clearCurrentService();
        }, fiveMinutes);
        sendUserIfNannyAccepts();

        return () => { clearTimeout(timeOut); };
    }, []);



    return (

        <Background.View>
            <Background.Header>
                <View style={{ padding: 10 }}>
                    <Text style={globalStyles.headerTitle}>Aguardando Resposta</Text>
                </View>
            </Background.Header>
            <AnimatedLottieView
                speed={1.5}
                autoPlay
                loop
                source={require('@lottie/waiting-service.json')} />

            <Text style={styles.titleWithMargin}>Aguarde uma resposta da babá para dar prosseguimento ao serviço.</Text>

            <Text style={styles.subTitleWithMargin}> *A babá tem até o horario de {moment().add(5, 'minute').format('HH:mm')} para aceitar o serviço.</Text>
        </Background.View>
    )
}