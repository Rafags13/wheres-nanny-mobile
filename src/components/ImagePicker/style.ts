import { StyleSheet } from "react-native";

export const common = StyleSheet.create({
    imagePickerContainer: {
        alignItems: "center",
        justifyContent: 'center',
        width: 90,
        height: 90,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3E9FEB'
    },
})

export const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        ...common.imagePickerContainer,
    },
    image: {
        width: 75,
        height: 75,
    },
    removeIcon: {
        alignSelf: 'flex-start',
    }
})