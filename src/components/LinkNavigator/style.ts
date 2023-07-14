import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    link: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        ...globalStyles.label
    }
})