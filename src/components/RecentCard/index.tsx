import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "./style";
import LinearGradient from 'react-native-linear-gradient';
import { getCurrentUser } from "../../storage";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../styles/global.styles";

type Props = {
    serviceId: number,
    nannyName: string,
    serviceDate: Date,
    imageUri: string
}

export default function RecentCard({ nannyName, serviceDate, imageUri, serviceId }: Props) {
    const navigator = useNavigation<any>();
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigator.navigate('serviceInformation', { serviceId, isCommonUser: true })}>
            <LinearGradient colors={['#3E9FEB', '#51a8ed']} style={styles.cardContainerLinearGradient}>
                <View style={styles.mainInformationContainer}>
                    <Image style={globalStyles.personPhotoTinySmall} source={{ uri: `data:image/png;base64,${imageUri}` }} />

                    <View>
                        <Text style={styles.fullnameText}>{nannyName}</Text>
                        <Text style={{ color: '#f6f6f6' }}>Babá</Text>
                    </View>
                </View>

                <View style={styles.dataContainer}>
                    <MaterialCommunityIcons name="calendar-blank" size={16} color="white" />
                    <Text style={{ color: 'white' }}>{moment(serviceDate).format('DD/MM/YYYY, HH:mm:ss')}</Text>
                </View>
            </LinearGradient >
            <View style={styles.bottomOne} />
            <View style={styles.bottomTwo} />
        </TouchableOpacity>
    )
}