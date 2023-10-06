import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useQuery } from "react-query";
import { Background } from "@components/Background";
import { LoadingContextType, LoadingContext } from "@context/LoadingContext";
import { recentCardDto } from "@dtos/Person/DisplayInformationHomeUser";
import { globalStyles } from "@styles/global.styles";
import RecentCard from "@components/RecentCard";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getAllServices } from "@services/requests/ServiceRequests";
import ServiceCard from "@components/ServiceCard";
import Loader from "@components/Loader";
import { Skeleton } from "moti/skeleton";

export default function Services() {
    const [page, setPage] = useState<number>(0);
    const [loadingFooterActitivity, setLoadingFooterActitivity] = useState<boolean>(false);
    const { data, isLoading, refetch } = useQuery(["getAllServices"], async () => {
        if (page !== 0) setLoadingFooterActitivity(true);
        const { data } = await getAllServices(page);
        setPage(page + 1);
        setLoadingFooterActitivity(false);
        return data;
    })

    return (
        <Background.View style={{ padding: 10 }}>
            <Background.Header>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                    <Text style={[globalStyles.headerTitle]}>Meus Serviços</Text>
                    <FontAwesome5 name="baby-carriage" size={24} color="#192553" />
                </View>
            </Background.Header>
            <Loader show={isLoading} height={250} width={'100%'}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        if (index === 0) return (
                            <>

                                <RecentCard serviceId={item.serviceId} nannyName={item.personName} serviceDate={item.date} imageUri={item.imageUri} />
                                {
                                    data.length > 1 ? (<Text style={[globalStyles.subtitle, { marginTop: 30 }]}>Outros</Text>) : (<></>)
                                }
                            </>
                        );
                        return (
                            <ServiceCard
                                index={index.toString()}
                                imageUri={item.imageUri}
                                personName={item.personName}
                                serviceId={item.serviceId}
                                date={item.date}
                            />
                        )
                    }}
                    style={{}}
                    contentContainerStyle={{ gap: 15 }}
                    ListHeaderComponent={<Text style={[globalStyles.subtitle, { marginBottom: 10 }]}>Mais Recente</Text>}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollEnd={() => { refetch() }}
                    ListFooterComponent={() => {
                        if (!loadingFooterActitivity) return null;
                        return (
                            <View style={{ padding: 10 }}>
                                <ActivityIndicator size={24} color="black" />
                            </View>
                        )
                    }
                    }
                />
            </Loader>
            <View style={{ gap: 10, marginTop: 30 }}>

                <Loader show={isLoading} height={150} width={'100%'} />
                <Loader show={isLoading} height={150} width={'100%'} />
            </View>
        </Background.View>
    )
}