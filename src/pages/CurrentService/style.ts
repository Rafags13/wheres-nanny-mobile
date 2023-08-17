import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        marginTop: 10,
        marginBottom: 20,
        gap: 5,
    },
    centerPersonPhoto: {
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    }
})