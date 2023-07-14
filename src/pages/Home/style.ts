import { StyleSheet } from "react-native";
import { globalStyles } from "../../assets/styles/global.styles";

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
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
        marginBottom: 15,
    },
    seeAll: {
        color: '#3FA0EB',
        fontWeight: 'bold',
        fontSize: 16
    },
    fullnameNannyItem: {
        ...globalStyles.headerSubtitle,
        textAlign: 'left',
        color: '#192553',
    },
    findBetterNannyLabel: {
        ...globalStyles.headerTitle,
        textAlign: 'left',
        marginVertical: 20
    }
})