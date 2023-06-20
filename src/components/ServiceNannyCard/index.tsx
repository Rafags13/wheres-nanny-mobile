import moment from "moment";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export type ServiceNannyCardProps = {
    serviceId: number,
    clientName: string,
    servicePrice: number,
    hiringDate: Date,
    isFinished: boolean
}

export default function ServiceNannyCard({ clientName, servicePrice, hiringDate, isFinished }: ServiceNannyCardProps) {
    return (
        <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ backgroundColor: 'rgba(51, 51, 51, 0.25)', padding: 10, borderRadius: 5, }}>
                    <MaterialCommunityIcons name="baby-face-outline" size={48} color={"#192553"} />
                </View>
                <View style={{ gap: 15, marginLeft: 10 }}>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text>{clientName}</Text>
                        <Text>R$ {servicePrice.toString()}</Text>
                        <Text textBreakStrategy="balanced">Data de encontro: {moment(hiringDate).format('DD/MM/YYYY [às] HH:mm')}.</Text>
                        <Text>{isFinished ? 'Finalizado' : 'Não finalizado'}.</Text>
                    </View>
                </View>
            </View>
            <Entypo name="chevron-right" size={24} color={"#192553"} />


        </TouchableOpacity>
    )
}