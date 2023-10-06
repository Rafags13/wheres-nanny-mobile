import { text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    dataContainer: {
        backgroundColor: '#78BCF1',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 15
    },
    commonServiceCardContainer: {
        backgroundColor: '#c5e2f9',
        padding: 15,
        borderRadius: 10,
        gap: 10
    },
    commonServiceCardPersonNameText: {
        ...text.common,
        fontFamily: 'Gellix-Bold',
    },
    commonServiceWorkText: {
        ...text.common,
        fontSize: 14,
    }
})