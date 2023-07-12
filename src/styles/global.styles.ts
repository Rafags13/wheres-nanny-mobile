import { StyleSheet } from "react-native";

const common = StyleSheet.create({
    defaultText: {
        color: '#192553',
        fontFamily: 'Gellix-Regular',
    },
    title: {
        fontFamily: 'Gellix-Bold',
        color: '#192553',
    }
})

export const text = StyleSheet.create({
    common: {
        ...common.defaultText,
        fontSize: 16,
    },
})

export const globalStyles = StyleSheet.create({
    title: {
        ...common.defaultText,
        fontSize: 32,
        ...common.title
    },
    subtitle: {
        fontSize: 24,
        marginTop: 10,
        ...common.title
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
        textAlign: 'center',
        fontFamily: 'Gellix-Bold'
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#999',
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Gellix-Bold'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: '#3E9FEB',
        color: 'black',
        borderRadius: 4,
        borderWidth: 1,
    },
    errorInput: {
        borderColor: 'red'
    },
    disabledInput: {
        ...text.common,
        fontSize: 14,
        backgroundColor: 'rgba(195, 195, 195, 0.25)',
        color: '#c4c4c4'
    },
    inputWithIcon: {
        ...text.common,
        fontSize: 14,
        width: '90%',
        color: 'black'
    },
    label: {
        marginBottom: 5,
        marginLeft: 2,
        ...text.common
    },
    errorMessage: {
        ...text.common,
        color: 'red',
    },
    defaultButton: {
        height: 42,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        flexDirection: 'row',
        gap: 10,
    },
    labelButton: {
        color: 'white',
        fontFamily: 'Gellix-Bold'
    },
    personPhotoTinySmall: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    personPhotoSmall: {
        width: 75,
        height: 75,
        marginRight: 10,
    }
})