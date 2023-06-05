import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    labels: {
        flexDirection: 'row',
        marginRight: 25,
        gap: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
        borderRadius: 20,
        ...globalStyles.shadow
    },
})