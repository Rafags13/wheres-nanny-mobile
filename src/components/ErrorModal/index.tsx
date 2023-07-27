import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Lottie from 'lottie-react-native';
import Modal from 'react-native-modal'
import Button from "@components/Button";
import { logOut } from "@storage/index";
import { LoadingContextType, LoadingContext } from "@context/LoadingContext";
import BotError from '@lottie/bot-error-no-nanny.json';
import { styles } from "./style";

export default function ErrorModal() {
    const navigation = useNavigation<any>();
    const [openModal, setOpenModal] = useState<boolean>(true);
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    useEffect(() => {
        setLoading(false)
    }, []);

    function backToLoginPage() {
        logOut();
        setOpenModal(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'login' },
                ],
            })
        );
    }

    return (
        <View>
            <Modal isVisible={openModal}>
                <View style={styles.modalContainer}>
                    <Lottie source={BotError} style={styles.lottie} autoPlay loop />
                    <Text style={styles.errorText}>
                        Infelizmente na sua cidade não existem babás disponíveis.
                        Tente acessar o aplicativo em outro instante e verifique
                        se foram adicionadas novas babás.
                    </Text>
                    <Button label={"Entendo.."} onClick={backToLoginPage} />
                </View>
            </Modal >
        </View >
    )
}