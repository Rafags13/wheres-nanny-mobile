import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import { globalStyles } from "../../styles/global.styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Line from "../../components/Line";
import { getCurrentUser } from "../../storage";
import { styles } from "./style";
import moment from "moment";
import ServiceNannyCard, { ServiceNannyCardProps } from "../../components/ServiceNannyCard";
import { useQuery } from "react-query";
import { getData } from "../../services/apiRequests";
import { useContext, useEffect } from "react";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";

export default function MyServices() {
    const currentUser = getCurrentUser();
    const { setLoading } = useContext(LoadingContext) as LoadingContextType
    const { data, isLoading } = useQuery('GetAllServices', () => getData(`Nanny/GetAllServices/${currentUser.id}`));

    if (isLoading) {
        return (<></>)
    }

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading])

    const allServices: ServiceNannyCardProps[] = data?.data
    return (
        <Background
            header={
                <View style={{ padding: 10 }}>
                    <Text style={globalStyles.headerTitle}>Meus Serviços</Text>
                </View>
            }
        >
            <View style={{ padding: 10 }}>
                <FlatList
                    data={allServices}
                    renderItem={({ item }) => (
                        <ServiceNannyCard clientName={item.clientName} servicePrice={item.servicePrice} hiringDate={item.hiringDate} isFinished={true} serviceId={item.serviceId} />
                    )}

                    ItemSeparatorComponent={() => (<View style={{ marginVertical: 10 }} />)}
                // TODO: Add pagination informations
                />
            </View >
        </Background >
    )
}