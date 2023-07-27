import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { globalStyles } from "@styles/global.styles";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export type ServiceCardProps = {
    index: string,
    imageUri: string,
    personName: string,
    serviceId: number,
    date: Date
}

export default function ServiceCard({ index, imageUri, personName, serviceId, date }: ServiceCardProps) {
    const navigator = useNavigation<any>();
    return (
        <TouchableOpacity id={index.toString()} style={styles.commonServiceCardContainer} onPress={() => navigator.navigate('serviceInformation', { serviceId: serviceId, isCommonUser: true })}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${imageUri}` }} />
                <View>
                    <Text style={styles.commonServiceCardPersonNameText}>{personName}</Text>
                    <Text style={styles.commonServiceWorkText}>Babá</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <MaterialCommunityIcons name="calendar-blank" size={14} color="white" />
                <Text style={{ color: 'white', fontSize: 12 }}>{moment(date).format('DD/MM/YYYY, HH:mm:ss')}</Text>
            </View>
        </TouchableOpacity>
    )
}