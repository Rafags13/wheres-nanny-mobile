import { common } from "@components/ImagePicker/style";
import { globalStyles, text } from "@styles/global.styles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleWithMargin: {
        ...globalStyles.subtitle,
        textAlign: 'center',
        marginHorizontal: 10,
        fontSize: 18,
    },
    subTitleWithMargin: {
        ...globalStyles.headerSubtitle,
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 14,
        textAlign: 'left'
    }


})

export default styles;