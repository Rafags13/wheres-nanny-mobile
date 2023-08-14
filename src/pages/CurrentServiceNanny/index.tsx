import { Message } from "@models/dto/Chat/message";
import { useNavigation } from "@react-navigation/native";
import { addNewMessage, clearCurrentService } from "@storage/index";
import { text } from "@styles/global.styles";
import { actions } from "@util/fabButtonActions";
import socket from "@util/socket";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { FloatingAction } from "react-native-floating-action";
export default function CurrentServiceNanny() {
    const navigation = useNavigation<any>();
    const buttonRef = useRef<any>(null);

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

    return (
        <View style={{ flex: 1 }}>
            <Text style={text.common}>informações sobre o serviço e a pessoa que contratou</Text>
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
            {/* Colocar: Nome do cliente, foto, endereço dela em relação à pessoa que vai prestar
                o serviço, custo final, considerando o dia e hora. Colocar também um botão redondo
                e flutuante, para mais ações do usuário, a respeito do serviço em si.
             */}
            {/* Add Person Informations for nanny */}
        </View>
    )
}