import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 10,
        margin: 5,
        padding: 15,
        borderRadius: 20,
        ...globalStyles.shadow
    },
})