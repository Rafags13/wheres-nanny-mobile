import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    personPhoto: {
        width: 75,
        height: 75,
        marginRight: 10,
        marginVertical: 10,
    },
    personName: {
        ...globalStyles.title,
        fontFamily: 'Gellix-SemiBold',
        fontSize: 18
    },
    commonTextDescription: {
        ...globalStyles.commonText,
        fontSize: 14,
    }
})