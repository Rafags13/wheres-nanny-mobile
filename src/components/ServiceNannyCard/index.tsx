import moment from "moment";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from "./style";
import { globalStyles } from "../../styles/global.styles";
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
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'rgba(51, 51, 51, 0.1)', padding: 10, borderRadius: 5, }}>
                    <MaterialCommunityIcons name="baby-face-outline" size={48} color={"#192553"} />
                </View>
                <View style={{ gap: 15, marginLeft: 10 }}>
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