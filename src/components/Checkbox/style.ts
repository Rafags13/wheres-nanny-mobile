import { text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text: {
        ...text.common,
        maxWidth: '90%'
    }
})