import { Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import RecentCard from "./RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import NannyCardList from "../../features/listNanny/NannyCardList";
import ListFilterNanny from "../../components/ListFilterNanny";
import React, { useContext, useEffect } from "react";
import Button from "../../components/Button";
import ErrorModal from "./ErrorModal";

import { useAppSelector } from '../../app/hooks';
import { LoadingContextType, LoadingContext } from "../../context/LoadingContext";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const navigator = useNavigation<any>();
    const currentInformation = useAppSelector((state) => state.userInformation.value)
    const isLoadingData = useAppSelector((state) => state.userInformation.statusQuery === 'loading')
    const error = useAppSelector((state) => state.userInformation.error);

    const nannyList = useAppSelector((state) => state.userInformation.value.nannyListOrderedByFilter)

    useEffect(() => {
        setLoading(isLoadingData)
    }, [isLoadingData])

    if (isLoadingData) {
        return (
            <></>
        )
    }

    if (error) {
        return (
            <ErrorModal />
        )
    }
    return (
        <Background
            isScroll
            header={
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="bell" color={"#c4c4c4"} size={24} />
                    </TouchableOpacity>

                    <View >
                        <Text style={globalStyles.headerTitle}>Campo Grande</Text>
                        <Text style={globalStyles.headerSubtitle}>130 ofertas</Text>
                    </View>

                    <TouchableOpacity style={styles.headerIcon}>
                        <Feather name="search" color={"#c4c4c4"} size={24} />
                    </TouchableOpacity>
                </View>
            }
        >
            <View style={{ padding: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.recentContainer}>
                        <Text style={globalStyles.headerTitle}>Recente</Text>
                        {currentInformation?.mostRecentService !== null && (
                            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigator.navigate('services')}>
                                <Text style={styles.seeAll}>Ver todos</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {currentInformation?.mostRecentService === null ? (
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, gap: 10, justifyContent: 'space-between', ...globalStyles.shadow }}>
                            <Text style={globalStyles.headerSubtitle}>
                                Nenhum serviço encontrado
                            </Text>
                            <Text style={{ fontFamily: 'Gellix-Regular' }}>
                                Nenhum serviço foi encontrado na sua conta. Clique no botão abaixo e contrate um serviço, ou escolha uma das babás abaixo e as contrate.
                            </Text>
                            <Button label={"Contratar"} onClick={() => { }} />
                        </View>
                    ) : (
                        <RecentCard
                            nannyName={currentInformation?.mostRecentService.personName}
                            serviceDate={currentInformation?.mostRecentService.date}
                            serviceId={currentInformation?.mostRecentService.serviceId}
                            imageUri={currentInformation.mostRecentService.imageUri} />
                    )}

                </View>
                <View>

                    <Text style={[globalStyles.headerTitle, { textAlign: 'left', marginVertical: 20 }]}>Procurar a melhor babá</Text>

                    <ListFilterNanny />

                    <NannyCardList nannyList={nannyList} />
                </View>
            </View>
        </Background>
    )
}
