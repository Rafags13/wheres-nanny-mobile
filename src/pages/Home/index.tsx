import { Text, TouchableOpacity, View } from "react-native";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import RecentCard from "./RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import NannyCardList from "../../features/listNanny/NannyCardList";
import ListFilterNanny from "../../components/ListFilterNanny";
import Spinner from "../../components/Spinner";
import React from "react";
import Button from "../../components/Button";
import ErrorModal from "./ErrorModal";

import { useAppSelector } from '../../app/hooks';

export default function Home() {
    const currentInformation = useAppSelector((state) => state.userInformation.value)
    const isLoading = useAppSelector((state) => state.userInformation.status === 'loading')

    if (isLoading) {
        return (
            <Spinner visible={isLoading} />
        )
    }

    if (currentInformation?.nannyListOrderedByFilter?.length === 0) {
        return (
            <ErrorModal />
        )
    }
    return (
        <Background
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
            <View style={{ flex: 0.4, marginTop: 10 }}>
                <View style={styles.recentContainer}>
                    <Text style={globalStyles.headerTitle}>Recente</Text>
                    {currentInformation?.mostRecentService !== null && (
                        <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.seeAll}>Ver todos</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {currentInformation?.mostRecentService === null ? (
                    <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, padding: 10, justifyContent: 'space-between' }}>
                        <Text style={globalStyles.headerSubtitle}>
                            Nenhum serviço encontrado
                        </Text>
                        <Text >
                            Nenhum serviço foi encontrado na sua conta. Clique no botão abaixo e contrate um serviço, ou escolha uma das babás abaixo e as contrate.
                        </Text>
                        <Button label={"Contratar"} onClick={() => { }} />
                    </View>
                ) : (
                    <RecentCard nannyName={"Emma Nilson"} serviceDate={"22/09/2004 às 19:30:31"} />
                )}

            </View>
            <View style={{ flex: 0.6 }}>

                <Text style={[globalStyles.headerTitle, { textAlign: 'left', marginVertical: 20 }]}>Procurar a melhor babá</Text>

                <ListFilterNanny />

                <NannyCardList />

            </View>

        </Background>
    )
}
