import { StyleSheet } from "react-native";

const style = (style?: any) => StyleSheet.create({
    lineContainer: {
        width: '100%',
        height: 2,
        backgroundColor: 'black',
        ...style
    }
});

export default style;