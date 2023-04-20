import { StyleSheet } from "react-native";

const common = StyleSheet.create({
    defaultText: {
        color: '#0f0f0f',
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
    }
})