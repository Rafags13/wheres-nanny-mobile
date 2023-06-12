import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";
import { Dimensions } from "react-native";
const width = Dimensions.get('window').width;

const common = StyleSheet.create({
    titleLabel: {
        ...globalStyles.title,
        fontSize: 20,
    }
})

const styles = StyleSheet.create({
    nannyProfilePicture: {
        height: 75,
        width: 75,
    },
    basicNannyInformationSection: {
        flexDirection: 'row',
        marginTop: 20,
    },
    nameAndRatingContainer: {
        justifyContent: 'space-around',
        marginLeft: 15
    },
    starsRatingContainer: {
        flexDirection: 'row'
    },
    textStarsNumber: {
        marginLeft: 10,
        marginRight: 3,
    },
    mainContentContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 25,
        justifyContent: 'space-between',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
        height: '100%',
    },
    titleLabels: {
        ...globalStyles.title,
        fontSize: 20,
    },
    contactNannyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
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