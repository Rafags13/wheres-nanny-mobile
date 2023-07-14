import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    notFoundServiceContainer: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        gap: 10,
        ...globalStyles.shadow
    }
})