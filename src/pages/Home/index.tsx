import { Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import RecentCard from "../../components/RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import NannyCardList from "../../features/listNanny/NannyCardList";
import ListFilterNanny from "../../components/ListFilterNanny";
import React, { useContext, useEffect } from "react";
import Button from "../../components/Button";
import ErrorModal from "../../components/ErrorModal";

import { useAppSelector } from '../../app/hooks';
import { LoadingContextType, LoadingContext } from "../../context/LoadingContext";
import { useNavigation } from "@react-navigation/native";
import NotFoundService from "../../components/NotFoundService";

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
                        <NotFoundService />
                    ) : (
                        <RecentCard
                            nannyName={currentInformation?.mostRecentService.personName}
                            serviceDate={currentInformation?.mostRecentService.date}
                            serviceId={currentInformation?.mostRecentService.serviceId}
                            imageUri={currentInformation.mostRecentService.imageUri} />
                    )}

                </View>
                <View>

                    <Text style={styles.findBetterNannyLabel}>Procurar a melhor babá</Text>

                    <ListFilterNanny />

                    <NannyCardList nannyList={nannyList} />
                </View>
            </View>
        </Background>
    )
}
