import { StyleSheet } from "react-native";
import { globalStyles } from "@styles/global.styles";

export const styles = StyleSheet.create({
    inputNonPassword: {
        ...globalStyles.input,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})