import { Background } from "@components/Background";
import { ModalContext, ModalContextType } from "@context/ModalContext";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addCurrentServiceToAsync, clearCurrentService } from "@storage/index";
import { globalStyles, text } from "@styles/global.styles";
import AnimatedLottieView from "lottie-react-native";
import moment from "moment";
import { useContext, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import styles from "./style";

export default function WaitingService() {
    const navigator = useNavigation<any>();
    const { showModal } = useContext(ModalContext) as ModalContextType;

    useEffect(() => {
        addCurrentServiceToAsync({
            waitingResponse: true,
            messages: []
        });

        const fiveMinutes = 30000;
        const timeOut = setTimeout(() => {
            navigator.navigate('commonUser', { screen: 'home', initial: true, });
            showModal({ modalType: 'error', message: 'A babá não aceitou o serviço a tempo, tente novamente.' });
            clearCurrentService();
        }, fiveMinutes)

        return () => { clearTimeout(timeOut) };

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