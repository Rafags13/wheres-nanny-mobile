import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";
const common = StyleSheet.create({
    input: {
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3E9FEB',
        color: 'black'
    },
})

export const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        marginLeft: 2,
        ...globalStyles.commonText
    },
    commonInput: {
        ...common.input
    },
    inputNonPassword: {
        ...common.input,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    inputPassword: {
        width: '90%',
        padding: 10,
        color: 'black'
    },
    inputError: {
        borderColor: 'red'
    },
    inputDisabled: {
        backgroundColor: 'rgba(195, 195, 195, 0.25)',
        color: '#c4c4c4'
    }
})