import { globalStyles } from '@styles/global.styles';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F8FDFE',
    },
    backButtonHeader: {
        alignSelf: 'flex-start',
        padding: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        zIndex: 2,
        ...globalStyles.shadow
    },
    backIconContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    absoluteTitle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    }
})

export default styles;