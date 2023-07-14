import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    label: {
        ...globalStyles.errorMessage,
        marginTop: 5
    }
})