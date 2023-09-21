
import { View } from "react-native";
import socket from "@util/socket";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@components/Button";
import { getCurrentMessages, getCurrentService, getCurrentUser } from "@storage/index";
import Input from "@components/Input";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from "react-hook-form";
import { Message } from "@models/dto/Chat/message";
import ChatListMessages from "@components/ChatListMessages";

import { Dimensions } from "react-native";
import { Background } from "@components/Background";

var width = Dimensions.get('window').width;

export default function Chat() {
    const currentUser = getCurrentUser();
    const currentService = getCurrentService();
    const { control, handleSubmit, setValue } = useForm();
    const currentMessages = useMemo(() => getCurrentMessages(), []);
    const [messages, setMessages] = useState<Message[]>(currentMessages);

    useEffect(() => {
        socket.on('message', (data) => {
            const newMessage: Message = {
                content: data.message,
                user: data.user,
                time: new Date()
            }
            console.log('mensagem recebida no chat')
            setMessages(oldMessages => [...oldMessages, newMessage]);
        });
    }, [socket]);

    const onSendMessage = useCallback((data: any) => {
        if (data.message !== '') {
            setValue('message', '');
            socket.emit("message", { message: data.message, user: currentUser.username, room: currentService.serviceId });
        }
    }, [currentService.serviceId]);

    return (
        <Background.View>
            <Background.BackHeader title="Chat" />
            <ChatListMessages messages={messages} />

            <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around', paddingVertical: 10, flexDirection: 'row', backgroundColor: '#F8FDFE'
            }}>
                <Input label={"message"} multiline control={control} style={{ width: width - 100 }} />
                <Button
                    label={""}
                    onClick={handleSubmit(onSendMessage)}
                    containerStyle={{ width: 50, }}
                    icon={<Ionicons name={'paper-plane'} color={'white'} size={24} />}
                />
            </View>
        </Background.View>
    )
}