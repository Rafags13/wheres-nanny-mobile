import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Background from "../../components/Background";
import { globalStyles } from "../../assets/styles/global.styles";
import ServiceNannyCard, { ServiceNannyCardProps } from "../../components/ServiceNannyCard";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";
import { getAllServicesFromCurrentNanny } from "../../services/requests/NannyRequests";

export default function MyServices() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const [page, setPage] = useState<number>(0);
    const [loadingFooterActitivity, setLoadingFooterActitivity] = useState<boolean>(false);
    const [list, setList] = useState<ServiceNannyCardProps[]>([]);
    const { data, isLoading } = useQuery('GetAllServices', async () => {
        var { data } = await getAllServicesFromCurrentNanny(page);
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

        const { data } = await getAllServicesFromCurrentNanny(page);
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
            />
        </Background >
    )
}