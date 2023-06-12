import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    background: {
        paddingTop: 10,
        backgroundColor: '#F8FDFE',
    },
    backButtonHeader: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        ...globalStyles.shadow
    }
})