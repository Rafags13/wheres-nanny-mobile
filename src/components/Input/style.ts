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
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3E9FEB'
    },
    inputNonPassword: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    inputPassword: {
        width: '90%',
        padding: 10,
    },
    inputError: {
        borderColor: 'red'
    }
})