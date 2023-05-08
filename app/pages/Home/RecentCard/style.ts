import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#3E9FEB',
        padding: 20,
        borderRadius: 25
    },
    mainInformationContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    personPhoto: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    fullnameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    dataContainer: {
        backgroundColor: '#78BCF1',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 15,
        borderRadius: 15
    }
})