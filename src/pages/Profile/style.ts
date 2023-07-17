import { StyleSheet } from "react-native";
import { globalStyles } from "@styles/global.styles";

export const styles = StyleSheet.create({
    title: {
        ...globalStyles.headerTitle,
        textAlign: "left",
    },
    imageProfileContainer: {
        alignItems: 'center'
    },
    nannyProfilePicture: {
        ...globalStyles.personPhotoSmall,
        borderRadius: 100,
        marginTop: 10,
    },
    personalInformationsTitle: {
        ...globalStyles.headerTitle,
        fontSize: 22,
        textAlign: 'left',
        marginBottom: 10
    },
    inputsContainer: {
        gap: 15,
    }
})