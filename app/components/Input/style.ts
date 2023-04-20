import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        marginLeft: 2,
        ...globalStyles.commonText
    },
    input: {
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 20,
        borderColor: '#0f0f0f'
    },
    inputNonPassword: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    inputPassword: {
        width: '90%',
        padding: 10,
    }
})