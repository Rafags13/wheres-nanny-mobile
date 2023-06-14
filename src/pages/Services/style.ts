import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    personPhoto: {
        width: 50,
        height: 50,
        marginRight: 10
    },
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
        marginVertical: 10,
        borderRadius: 10,
        gap: 10
    },
    commonServiceCardPersonNameText: {
        ...globalStyles.commonText,
        fontFamily: 'Gellix-Bold',
    },
    commonServiceWorkText: {
        ...globalStyles.commonText,
        fontSize: 14,
    }
})