import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import { globalStyles } from "../../styles/global.styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Line from "../../components/Line";
import { getCurrentUser } from "../../storage";
import ServiceNannyCard, { ServiceNannyCardProps } from "../../components/ServiceNannyCard";
import { useQuery } from "react-query";
import { getData } from "../../services/apiRequests";
import { useContext, useEffect, useState } from "react";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";

export default function MyServices() {
    const currentUser = getCurrentUser();
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const [page, setPage] = useState<number>(0);
    const [loadingFooterActitivity, setLoadingFooterActitivity] = useState<boolean>(false);
    const [list, setList] = useState<ServiceNannyCardProps[]>([]);
    const { data, isLoading } = useQuery('GetAllServices', async () => {
        var { data } = await getData(`Nanny/GetAllServices/${currentUser.id}/${page}`)
        setList([...list, ...data]);
        setPage(page + 1);

        return data;
    });
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading])

    async function updateListByNewPage() {
        if (loadingFooterActitivity) return;
        setLoadingFooterActitivity(true);

        const { data } = await getData(`Nanny/GetAllServices/${currentUser.id}/${page}`);
        setList([...list, ...data]);
        setPage(page + 1)

        setLoadingFooterActitivity(false);
    }

    return (
        <Background
            header={
                <View style={{ padding: 10 }}>
                    <Text style={globalStyles.headerTitle}>Meus Serviços</Text>
                </View>
            }
        >
            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    return (
                        <ServiceNannyCard clientName={item.clientName} servicePrice={item.servicePrice} hiringDate={item.hiringDate} isFinished={true} serviceId={item.serviceId} />
                    )
                }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.15}
                onMomentumScrollEnd={updateListByNewPage}
                style={{ padding: 10 }}
                ListFooterComponent={() => {
                    if (!loadingFooterActitivity) return null
                    return (
                        <View style={{ padding: 10 }}>
                            <ActivityIndicator size={24} color="black" />
                        </View>
                    )
                }}
            // TODO: Add pagination informations
            />
        </Background >
    )
}