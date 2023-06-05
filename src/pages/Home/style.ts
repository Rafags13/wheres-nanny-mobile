import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerIcon: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        ...globalStyles.shadow
    },
    recentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    seeAll: {
        color: '#3FA0EB',
        fontWeight: 'bold',
        fontSize: 16
    },
    findBetterNannyOption: {
        marginVertical: 20
    },
    labels: {
        flexDirection: 'row',
        gap: 10,
        marginRight: 25,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20
    },
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
    }
})