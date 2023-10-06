import { text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

type StyleProps = {
    isCurrentUserInThisMessage: boolean
}

const styles = ({ isCurrentUserInThisMessage }: StyleProps) => StyleSheet.create({
    ballonContainer: {
        alignSelf: isCurrentUserInThisMessage ? 'flex-end' : 'flex-start',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: isCurrentUserInThisMessage ? 30 : 10,
        paddingRight: !isCurrentUserInThisMessage ? 30 : 10,
        backgroundColor: '#3E9FEB',
    },
    messageText: {
        ...text.common,
        textAlign: isCurrentUserInThisMessage ? 'right' : 'left',
        maxWidth: '60%',
        alignSelf: 'center',
        fontSize: 16,
        color: "white",
        marginBottom: 10
    },
    hourText: {
        ...text.common,
        color: "#333",
        marginRight: isCurrentUserInThisMessage ? 5 : 0,
        marginLeft: !isCurrentUserInThisMessage ? 5 : 0,
        textAlign: isCurrentUserInThisMessage ? 'right' : 'left',
        fontSize: 12
    }
})

export default styles;