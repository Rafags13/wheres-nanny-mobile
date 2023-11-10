import { globalStyles, text } from '@styles/global.styles';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 5 
    },
   title: {
        ...globalStyles.headerTitle,
        textAlign: "left",
        marginLeft: 5,
    },
    nameOfHigherPayer: {
    ...text.common,
    fontFamily: 'Gellix-Bold',
    }
})

export default styles;