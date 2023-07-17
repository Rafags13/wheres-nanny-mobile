import { StyleSheet } from "react-native";
import { globalStyles, text } from "@styles/global.styles";

export const styles = StyleSheet.create({
    personName: {
        ...globalStyles.title,
        fontFamily: 'Gellix-SemiBold',
        fontSize: 18
    },
    commonTextDescription: {
        ...text.common,
        fontSize: 14,
    },
    serviceCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    babyIconContainer: {
        backgroundColor: 'rgba(51, 51, 51, 0.1)',
        padding: 10,
        borderRadius: 5,
    },
    personDataContainer: {
        gap: 15,
        marginLeft: 10
    }
})