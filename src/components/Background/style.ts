import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F8FDFE',
    },
    backButtonHeader: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: 2,
        ...globalStyles.shadow
    },
    backIconContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    }
})