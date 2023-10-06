import MessageBallon from "@components/MessageBallon"
import { Message } from "@models/dto/Chat/message"
import { useCallback, useRef, } from "react"
import { FlatList } from "react-native"

type Props = {
    messages: Message[]

}

export default function ChatListMessages({ messages }: Props) {
    const flatlistRef = useRef<any>(null);
    const renderItem = useCallback(({ item }: { item: Message }) => (
        <MessageBallon content={item.content} user={item.user} time={item.time} />
    ), []);

    function onMoveToBottom() {
        if (messages.length > 0)
            flatlistRef?.current?.scrollToEnd({ animated: false })
    }

    return (
        <FlatList
            ref={(ref) => flatlistRef.current = ref}
            data={messages}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={onMoveToBottom}
            onLayout={onMoveToBottom}
            renderItem={renderItem}
            style={{ marginHorizontal: 10 }}
        />
    )
}