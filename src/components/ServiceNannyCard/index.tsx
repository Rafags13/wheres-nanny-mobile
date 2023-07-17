import moment from "moment";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export type ServiceNannyCardProps = {
    serviceId: number,
    clientName: string,
    servicePrice: number,
    hiringDate: Date,
    isFinished: boolean
}

export default function ServiceNannyCard({ serviceId, clientName, servicePrice, hiringDate, isFinished }: ServiceNannyCardProps) {
    const navigator = useNavigation<any>();

    function onShowServiceInformations() {
        navigator.navigate('serviceInformation', { serviceId })
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onShowServiceInformations}
            style={styles.serviceCardContainer}>
            <View style={styles.dataContainer}>
                <View style={styles.babyIconContainer}>
                    <MaterialCommunityIcons name="baby-face-outline" size={48} color={"#192553"} />
                </View>
                <View style={styles.personDataContainer}>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.personName}>{clientName}</Text>
                        <Text style={styles.commonTextDescription}>R$ {servicePrice.toString()}</Text>
                        <Text style={styles.commonTextDescription}>Data de encontro: {moment(hiringDate).format('DD/MM/YYYY [às] HH:mm')}.</Text>
                        <Text style={styles.commonTextDescription}>{isFinished ? 'Finalizado' : 'Não finalizado'}.</Text>
                    </View>
                </View>
            </View>
            <Entypo name="chevron-right" size={24} color={"#192553"} />


        </TouchableOpacity>
    )
}