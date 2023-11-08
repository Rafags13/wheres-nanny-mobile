import GoogleMap from "@components/Map";
import Modal from "@components/Modal";
import { useLoading } from "@context/LoadingContext";
import { ModalType, useModal } from "@context/ModalContext";
import { TypeOfNotification } from "@enums/TypeOfNotification";
import { TypeOfUser } from "@enums/TypeOfUser";
import { Message } from "@models/dto/Chat/message";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { postData } from "@services/apiRequests";
import { CancelTheService, GetServiceInformationsFromNanny, GetServiceInformationsFromPerson } from "@services/requests/ChatResquests";
import { addNewMessage, clearCurrentService, getCurrentService, getCurrentUserAsync, onNotWaitingNannyResponseAnymore, onServiceAccept } from "@storage/index";
import { globalStyles, text } from "@styles/global.styles";
import { actions } from "@util/fabButtonActions";
import { aliasToDistance, formatCellphoneNumber, formatCep } from "@util/functions";
import socket from "@util/socket";
import moment from "moment";
import { useEffect, useMemo, useRef } from "react";
import { Image, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useQuery } from "react-query";
import { styles } from "./style";
import messaging from '@react-native-firebase/messaging';



export default function CurrentService() {
    const currentUser = getCurrentUserAsync();
    const currentService = getCurrentService();
    const { setLoading } = useLoading();
    const { showModal } = useModal();
    const isNanny = currentUser.typeOfUser === TypeOfUser.Nanny;
    const navigation = useNavigation<any>();
    const buttonRef = useRef<any>(null);
    const { data, isLoading } =
        useQuery(['GetServiceInformationsFromNanny', currentService.serviceId], async () => {
            const data = isNanny ?
                await GetServiceInformationsFromNanny(currentService.serviceId as number) :
                await GetServiceInformationsFromPerson(currentService.serviceId as number);

            return data.data;
        });

    useEffect(() => {
        function onCancelService() {
            messaging().onMessage(remoteMessage => {
                if (remoteMessage?.data?.typeOfNotification === TypeOfNotification.Negative.toString()) {
                    showModal({
                        modalType: ModalType.ERROR,
                        message: remoteMessage.data.message
                    });

                    const currentUser = getCurrentUserAsync();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: currentUser.typeOfUser === TypeOfUser.Nanny ? 'nannyUser' : 'commonUser' },
                            ],
                        })
                    );
                }
            })
        }

        onCancelService();
    }, []);

    const cancelService = async () => {
        showModal({
            message: "Você deseja mesmo cancelar o serviço?",
            modalType: ModalType.QUESTION,
            function: (wantToCancel) => {
                console.log(wantToCancel)
                if (wantToCancel) {
                    console.log(`serviço cancelado por ${currentUser.username}`)
                    CancelTheService(currentService.serviceId || 0).then((response) => {
                        showModal({
                            message: response.data,
                            modalType: ModalType.SUCCESS
                        });

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: isNanny ? 'nannyUser' : 'commonUser' },
                                ],
                            })
                        );
                        clearCurrentService();
                    }).catch((reason) => {
                        console.log('deu erro')
                        console.log(reason)
                    });
                }

            }
        })

    }

    useEffect(() => {
        socket.on('message', (data) => {
            const newMessage: Message = {
                content: data.message,
                user: data.user,
                time: new Date()
            }
            addNewMessage(newMessage);
        });
    }, [socket]);

    if (isLoading) return (<></>);

    return (
        <View style={styles.container}>
            <GoogleMap
                originCoordinates={data.originCoordinates}
                destinationCoordinates={data.destinationCoordinates}
                distanceHigherThenOneKilometer={data.distance > 1000}
            />
            <Modal
            >
                <Text style={globalStyles.headerTitle}>Serviço</Text>

                <View style={styles.modalContent}>
                    <Text style={text.common}>Distância: <Text style={text.title}>{aliasToDistance(data.distance)}</Text></Text>
                    <Text style={text.common}>Preço: <Text style={text.title}>R$ {data.servicePrice}</Text></Text>
                </View>

                <Text style={globalStyles.headerTitle}>{isNanny ? 'Cliente' : 'Babá'}</Text>
                <View style={styles.centerPersonPhoto}>
                    <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${data.pictureBase64}` }} />
                </View>

                <Text style={text.common}>Nome Completo: <Text style={text.title}>{data.name}</Text></Text>

                <Text style={text.common}>Idade: <Text style={text.title}>{moment(new Date()).diff(data.birthdayDate, "years")} anos</Text></Text>

                <Text style={text.common}>Cep: <Text style={text.title}>{formatCep(data.cep)}</Text></Text>

                <Text style={text.common}>Telefone: <Text style={text.title}>{formatCellphoneNumber(data.cellphone)}</Text></Text>

                <Text style={text.common}>E-mail (incomum): <Text style={text.title}>{data.email}</Text></Text>

            </Modal>

            <FloatingAction
                ref={ref => buttonRef.current = ref}
                actions={actions}
                color='#3E9FEB'
                onPressItem={(name) => {
                    switch (name) {
                        case 'button_chat': {
                            navigation.navigate('chat');
                            break;
                        }
                        case 'button_cancel_service': {
                            cancelService();
                            break;
                        }
                    }
                }}
            />
        </View>
    )
}