import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    labelToDocument: {
        color: '#192553',
    },
    iconContainer: {
        backgroundColor: '#3E9FEB',
        padding: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    documentPickerContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#3E9FEB',
        borderWidth: 1,
        marginTop: 10,
    },
    removeIcon: {
        alignSelf: 'flex-start',
        marginTop: 5,
    }
});