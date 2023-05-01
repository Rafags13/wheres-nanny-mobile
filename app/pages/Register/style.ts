import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    tabBar: {
        backgroundColor: 'transparent',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        marginTop: 20,
    },
    tabContainer: {
    },
    tabText: {
        padding: 15,
        color: '#9e9e9e',
        fontSize: 18,
        fontWeight: '500'
    },
    separator: {
        height: 0.1,
        width: '96%',
        alignSelf: 'flex-end',
        backgroundColor: '#eaeaea'
    },
    sectionHeaderContainer: {
        // height: 30,
        backgroundColor: '#f6f6f6',
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1
    },
})