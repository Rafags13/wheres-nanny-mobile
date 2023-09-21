import { globalStyles } from '@styles/global.styles';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputNonPassword: {
        ...globalStyles.input,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})

export default styles;