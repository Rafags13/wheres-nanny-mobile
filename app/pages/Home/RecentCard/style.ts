import { StyleSheet } from "react-native";
import { globalStyles } from "../../../styles/global.styles";

export const styles = StyleSheet.create({
    cardContainerLinearGradient: {
        borderRadius: 25,
        padding: 20,
        width: '100%'
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
    },
    bottomOne: {
        width: '85%',
        height: 10,
        backgroundColor: '#77bbf1',
        // borderRadius: 15,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    bottomTwo: {
        width: '75%',
        height: 10,
        backgroundColor: '#c5e2f9',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    }
})