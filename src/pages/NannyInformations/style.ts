import { StyleSheet } from "react-native";
import { globalStyles, text } from "../../styles/global.styles";
import { Dimensions } from "react-native";
const width = Dimensions.get('window').width;

const common = StyleSheet.create({
    titleLabel: {
        ...globalStyles.title,
        fontSize: 20,
    }
})

const styles = StyleSheet.create({
    basicNannyInformationSection: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    nameAndRatingContainer: {
        justifyContent: 'space-around',
        marginLeft: 15
    },
    nannyName: {
        ...globalStyles.headerTitle,
        fontSize: 18,
        textAlign: 'left',
        maxWidth: '90%',
        backgroundColor: 'red'
    },
    workAlias: {
        ...globalStyles.headerSubtitle,
        fontSize: 16,
        textAlign: 'left'
    },
    starsRatingContainer: {
        flexDirection: 'row',
    },
    textStarsNumber: {
        ...text.common
    },
    absoluteHeart: {
        position: 'absolute',
        right: 0,
        marginRight: 10,
    },
    mainContentContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 25,
        justifyContent: 'space-between',
        ...globalStyles.shadow,
        height: '100%',
    },
    titleLabels: {
        ...globalStyles.title,
        fontSize: 20,
    },
    contactNannyContainer: {
        justifyContent: 'space-between',
        marginVertical: 10,
        marginBottom: 10
    },
    dateTimeTitle: {
        ...common.titleLabel,
        marginTop: 40,
        marginBottom: 15
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    dateTimeComponent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        ...globalStyles.shadow
    },
    iconContainer: {
        backgroundColor: '#3E9FEB',
        padding: 5,
        borderRadius: 10
    },
    finalPriceContractNannyContainer: {
        padding: 25,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    }

});

export default styles;