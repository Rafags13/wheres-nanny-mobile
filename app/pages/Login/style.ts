import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    createAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'red',
    },
    createAccountText: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 40,
        ...globalStyles.commonText,
    },

})