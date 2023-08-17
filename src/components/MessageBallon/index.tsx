import { Message } from "@models/dto/Chat/message";
import moment from "moment";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";
import { getCurrentUser } from "@storage/index";
import styles from "./style";

const MessageBallon = memo(({ content, time, user }: Message) => {
    const isCurrentUserInThisMessage = useMemo(() => {
        const currentUser = getCurrentUser();
        return user == currentUser.username;
    }, []);

    const style = styles({ isCurrentUserInThisMessage })

    return (
        <>
            <View style={style.ballonContainer}>
                <Text style={style.messageText}>{content}</Text>
            </View>
            <Text style={style.hourText}>
                {moment(time).format('HH:mm:ss')}
            </Text>
        </>
    )
});

export default MessageBallon;