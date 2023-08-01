import { FlatList, Text, View } from "react-native";
import socket from "@util/socket";
import { useEffect, useState } from "react";
import Button from "@components/Button";
import { getCurrentUser } from "@storage/index";
import Input from "@components/Input";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Keyboard } from 'react-native';
import { useForm } from "react-hook-form";

type Message = {
    content: string,
    user: string,
}

export default function Chat() {
    const currentUser = getCurrentUser();
    const { control, handleSubmit, setValue, reset } = useForm();
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        socket.connect();
        socket.emit("select_room", { room: '1' });
    }, []);

    useEffect(() => {
        socket.on('message', (data) => {
            const newMessage: Message = {
                content: data.message,
                user: data.user,
            }
            setMessages(state => [...state, newMessage]);
        });
    }, [socket]);

    function onSendMessage(data: any) {
        setValue('message', '');
        socket.emit("message", { message: data.message, user: currentUser.username, room: '1' })
    }

    return (
        <View style={{ flex: 1, }}>
            <FlatList
                data={messages}
                renderItem={({ index, item }) => {
                    const isCurrentUserInThisMessage = item.user === currentUser.username;
                    return (
                        <View style={{ flex: 1, alignItems: isCurrentUserInThisMessage ? 'flex-end' : 'flex-start', marginVertical: 10 }}>
                            <View
                                id={index.toString()}
                                style={{ padding: 10, backgroundColor: 'white' }}
                            >
                                <Text style={{ color: 'black', textAlign: isCurrentUserInThisMessage ? 'right' : 'left' }}>{item.user}</Text>
                                <Text style={{ color: 'black', textAlign: isCurrentUserInThisMessage ? 'right' : 'left' }}>{item.content}</Text>
                            </View>
                        </View>
                    )
                }}
                style={{ maxHeight: '90%' }}
                ListFooterComponent={
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-around', bottom: 10, flexDirection: 'row' }}>
                        <Input label={"message"} control={control} style={{ minWidth: '80%' }} />
                        <Button
                            label={""}
                            onClick={handleSubmit(onSendMessage)}
                            containerStyle={{ width: 50, }}
                            icon={<Ionicons name={'paper-plane'} color={'white'} size={24} />}
                        />
                    </View>
                }
            />

        </View>
    )
}