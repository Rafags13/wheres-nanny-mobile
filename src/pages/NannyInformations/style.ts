import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global.styles";
import { Dimensions } from "react-native";
const width = Dimensions.get('window').width;

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
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 25,
        ...globalStyles.shadow
    },
    titleLabels: {
        ...globalStyles.title,
        fontSize: 20,
    },
    contactNannyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    }

});

export default styles;