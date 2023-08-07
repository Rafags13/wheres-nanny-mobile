
import { FlatList, Text, View } from "react-native";
import socket from "@util/socket";
import { useCallback, useEffect, useState } from "react";
import Button from "@components/Button";
import { getCurrentUser } from "@storage/index";
import Input from "@components/Input";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from "react-hook-form";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Message } from "@models/dto/Chat/message";
import ChatListMessages from "@components/ChatListMessages";

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;

export default function Chat() {
    const currentUser = getCurrentUser();
    const { control, handleSubmit, setValue } = useForm();
    const [messages, setMessages] = useState<Message[]>([]);

    const { params } = useRoute<RouteProp<{ params: { serviceId: number } }, 'params'>>();

    useEffect(() => {
        socket.connect();
        socket.emit("select_room", { room: params.serviceId });
    }, []);

    useEffect(() => {
        socket.on('message', (data) => {
            const newMessage: Message = {
                content: data.message,
                user: data.user,
                time: new Date()
            }
            setMessages(state => [...state, newMessage]);
        });
    }, [socket]);

    const onSendMessage = useCallback((data: any) => {
        setValue('message', '');
        socket.emit("message", { message: data.message, user: currentUser.username, room: params.serviceId });
    }, [params.serviceId]);

    return (
        <View style={{ flex: 1, backgroundColor: '#F8FDFE' }}>
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
        </View>

    )
}