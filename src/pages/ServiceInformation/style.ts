import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    title: {
        ...globalStyles.headerTitle,
        textAlign: "left",
        marginLeft: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        marginVertical: 5,
        paddingHorizontal: 5,
    }
})