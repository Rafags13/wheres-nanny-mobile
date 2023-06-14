import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import Background from "../../components/Background";
import { LoadingContextType, LoadingContext } from "../../context/LoadingContext";
import { recentCardDto } from "../../dto/Person/DisplayInformationHomeUser";
import { getData, postData } from "../../services/apiRequests";
import { getCurrentUser } from "../../storage";
import { globalStyles } from "../../styles/global.styles";
import RecentCard from "../Home/RecentCard";
import { styles } from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Services() {
    const currentUser = getCurrentUser();
    const [page, setPage] = useState<number>(0);
    const [loadingFooterActitivity, setLoadingFooterActitivity] = useState<boolean>(false);
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const [list, setList] = useState<recentCardDto[]>([]);
    const { data, isLoading } = useQuery("getAllServices", async () => {
        const { data } = await getData(`Service/GetAll/${currentUser.id}/${page}`);
        setList([...list, ...data]);
        setPage(page + 1);
        return data;
    })

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading])

    async function updateListByNewPage() {
        if (loadingFooterActitivity) return;
        setLoadingFooterActitivity(true);

        const { data } = await getData(`Service/GetAll/${currentUser.id}/${page}`);
        setList([...list, ...data]);
        setPage(page + 1)

        setLoadingFooterActitivity(false);
    }

    return (
        <Background
            header={
                <Text style={globalStyles.headerTitle}>Meus Serviços</Text>
            }>

            <FlatList
                data={list}
                renderItem={({ item, index }) => {
                    if (index === 0) return (
                        <>
                            <RecentCard serviceId={item.serviceId} nannyName={item.personName} serviceDate={item.date} imageUri={item.imageUri} />
                            <Text style={globalStyles.subtitle}>Outros</Text>
                        </>
                    );
                    return (
                        <TouchableOpacity id={index.toString()} style={styles.commonServiceCardContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.personPhoto} source={{ uri: `data:image/png;base64,${item.imageUri}` }} />
                                <View>
                                    <Text style={styles.commonServiceCardPersonNameText}>{item.personName}</Text>
                                    <Text style={styles.commonServiceWorkText}>Babá</Text>
                                </View>
                            </View>
                            <View style={styles.dataContainer}>
                                <MaterialCommunityIcons name="calendar-blank" size={14} color="white" />
                                <Text style={{ color: 'white', fontSize: 12 }}>{moment(item.date).format('DD/MM/YYYY, HH:mm:ss')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                ListHeaderComponent={<Text style={[globalStyles.subtitle, { marginBottom: 10 }]}>Mais Recente</Text>}
                showsVerticalScrollIndicator={false}
                onEndReached={updateListByNewPage}
                style={{ padding: 10 }}
                ListFooterComponent={() => {
                    if (loadingFooterActitivity) return null
                    return (
                        <View style={{ padding: 10 }}>
                            <ActivityIndicator size={24} color="black" />
                        </View>
                    )
                }
                }
            />

        </Background >
    )
}