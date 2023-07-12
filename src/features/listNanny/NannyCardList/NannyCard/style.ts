import { StyleSheet } from "react-native";
import { globalStyles } from "../../../../styles/global.styles";

export const styles = StyleSheet.create({
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
        backgroundColor: 'white',
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 20,
        ...globalStyles.shadow
    },
})