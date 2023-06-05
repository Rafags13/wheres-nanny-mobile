import { StyleSheet } from "react-native";

const common = StyleSheet.create({
    defaultText: {
        color: '#192553',
        fontFamily: 'Roboto',
    }
})

export const globalStyles = StyleSheet.create({
    commonText: {
        ...common.defaultText
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        ...common.defaultText
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        ...common.defaultText
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerTitle: {
        fontSize: 24,
        color: '#192553',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#999',
        fontWeight: '500',
        textAlign: 'center',
    }
})