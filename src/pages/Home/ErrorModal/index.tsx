import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Lottie from 'lottie-react-native';
import Modal from 'react-native-modal'
import { globalStyles } from "../../../styles/global.styles";
import Button from "../../../components/Button";
import { logOut } from "../../../storage";
import { LoadingContextType, LoadingContext } from "../../../context/LoadingContext";

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
                <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', borderRadius: 10, padding: 10 }}>
                    <Lottie source={require('../../../lottie/bot-error-no-nanny.json')} style={{ backgroundColor: 'white', height: 200, width: 200 }} autoPlay loop />
                    <Text style={[globalStyles.commonText, { textAlign: 'center', fontSize: 16 }]}>Infelizmente na sua cidade não existem babás disponíveis. Tente acessar o aplicativo em outro instante e verifique se foram adicionadas novas babás.</Text>
                    <Button label={"Entendo.."} onClick={backToLoginPage} />
                </View>
            </Modal >
        </View >
    )
}