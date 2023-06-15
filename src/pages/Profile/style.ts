import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    title: {
        ...globalStyles.headerTitle,
        textAlign: "left",
    },
    imageProfileContainer: {
        alignItems: 'center'
    },
    nannyProfilePicture: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginTop: 10,
    },
    personalInformationsTitle: {
        ...globalStyles.headerTitle,
        fontSize: 22,
        textAlign: 'left',
        marginBottom: 10
    },
    username: {
        ...globalStyles.commonText
    }
})