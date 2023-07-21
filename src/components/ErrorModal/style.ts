import { text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        width: 200,
    },
    errorText: {
        ...text.common,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 15
    }
})