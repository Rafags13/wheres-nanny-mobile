import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        gap: 5,
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
        marginBottom: 20,
    }
})