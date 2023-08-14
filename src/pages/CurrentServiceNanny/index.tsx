import GoogleMap from "@components/Map";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DisplayNannyServiceInformationDto } from "@models/dto/Chat/displayNannyServiceInformatioDto";
import { Message } from "@models/dto/Chat/message";
import { useNavigation } from "@react-navigation/native";
import { GetServiceInformationsFromNanny } from "@services/requests/ChatResquests";
import { addNewMessage, clearCurrentService, getCurrentService, getCurrentUser } from "@storage/index";
import { globalStyles, text } from "@styles/global.styles";
import { actions } from "@util/fabButtonActions";
import { aliasToDistance, formatCellphoneNumber, formatCep } from "@util/functions";
import socket from "@util/socket";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useQuery } from "react-query";
import { styles } from "./style";

export default function CurrentServiceNanny() {
    const currentPerson = getCurrentUser();
    const currentService = getCurrentService();
    const navigation = useNavigation<any>();
    const buttonRef = useRef<any>(null);
    const { data, isLoading } = useQuery(['GetServiceInformationsFromNanny', currentPerson.id],
        () => GetServiceInformationsFromNanny(currentService.serviceId as number));
    const displayData: DisplayNannyServiceInformationDto = data?.data;

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
        />
    ),
        []
    );

    const snapPoints = useMemo(() => ['20%', '70%', '95%'], []);

    useEffect(() => {
        socket.on('message', (data) => {
            const newMessage: Message = {
                content: data.message,
                user: data.user,
                time: new Date()
            }
            console.log('mensagem recebida na tela de serviço da babá')
            addNewMessage(newMessage);
        });
    }, [socket]);

    if (isLoading) return (<></>);

    return (
        <View style={styles.container}>
            <GoogleMap originCoordinates={displayData.originCoordinates} destinationCoordinates={displayData.destinationCoordinates} />
            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetScrollView contentContainerStyle={styles.modalContainer}>
                    <Text style={globalStyles.headerTitle}>Serviço</Text>

                    <View style={styles.modalContent}>
                        <Text style={text.common}>Distância: <Text style={text.title}>{aliasToDistance(displayData.distance)}</Text></Text>
                        <Text style={text.common}>Preço: <Text style={text.title}>R$ {displayData.servicePrice}</Text></Text>
                    </View>

                    <Text style={globalStyles.headerTitle}>Cliente</Text>
                    <View style={styles.centerPersonPhoto}>
                        <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${displayData.parentPictureBase64}` }} />
                    </View>

                    <Text style={text.common}>Nome Completo: <Text style={text.title}>{displayData.parentName}</Text></Text>

                    <Text style={text.common}>Idade: <Text style={text.title}>{moment(new Date()).diff(displayData.parentBirthdayDate, "years")} anos</Text></Text>

                    <Text style={text.common}>Cep: <Text style={text.title}>{formatCep(displayData.parentCep)}</Text></Text>

                    <Text style={text.common}>Telefone: <Text style={text.title}>{formatCellphoneNumber(displayData.parentCellphone)}</Text></Text>

                    <Text style={text.common}>E-mail (incomum): <Text style={text.title}>{displayData.parentEmail}</Text></Text>
                </BottomSheetScrollView>
            </BottomSheet>
            <FloatingAction
                ref={ref => buttonRef.current = ref}
                actions={actions}
                color='#3E9FEB'
                onPressItem={(name) => {
                    switch (name) {
                        case 'button_chat': {
                            navigation.navigate('chat');
                            buttonRef.current.animateButton();
                            break;
                        }
                        case 'button_cancel_service': {
                            navigation.navigate('nannyUser', { screen: 'dashboardNavigator', initial: true });
                            clearCurrentService();
                            break;
                        }
                    }
                }}
            />
        </View>
    )
}