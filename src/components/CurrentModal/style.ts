import { text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

export const styles = (error: boolean) => StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 10
    },
    lottie: {
        backgroundColor: 'white',
        height: 200,
        width: 200
    },
    message: {
        ...text.common,
        color: error ? 'red' : '#192553',
        textAlign: 'center',
        marginBottom: 15
    },
    questionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around' 
    }
})