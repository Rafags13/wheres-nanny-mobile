import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../styles/global.styles";

export const styles = StyleSheet.create({
    personPhoto: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    fullnameNannyItem: {
        ...globalStyles.headerSubtitle,
        textAlign: 'left',
        color: '#192553',
    },
    workNannyItem: {
        color: '#192553',
        fontSize: 16
    },
    starsNannyCountingContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    starsNannyCouting: {
        marginLeft: 10,
        color: '#c4c4c4',
        fontWeight: '700'
    },
    labels: {
        flexDirection: 'row',
        gap: 10,
        // marginRight: 25,
        backgroundColor: 'white',
        // width: '90%',
        marginHorizontal: 10,
        // marginLeft
        // maxWidth: 300,
        padding: 15,
        borderRadius: 20,
        ...globalStyles.shadow
    },
})