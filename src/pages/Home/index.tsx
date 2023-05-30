import { Text, TouchableOpacity, View, FlatList } from "react-native";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import { getCurrentUser, getToken, logOut } from "../../storage";
import RecentCard from "./RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import NannyCardList from "../../components/NannyCardList";
import { NannyCardProps } from "../../components/NannyCard";
import ListFilterNanny from "../../components/ListFilterNanny";
import { postData } from "../../services/apiRequests";
import { FindCommonUserServicesDto } from "../../dto/Person/FindCommonUserServicesDto";
import { useQuery } from "react-query";
import AnimatedLoader from "react-native-animated-loader";
import Spinner from "../../components/Spinner";
import { DisplayInformationHomeUser } from "../../dto/Person/DisplayInformationHomeUser";
import Modal from "react-native-modal";
import React, { useState } from "react";
import Lottie from 'lottie-react-native';
import Button from "../../components/Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import ErrorModal from "./ErrorModal";

export default function Home() {
    const currentUser = getCurrentUser();
    const navigation = useNavigation<any>();
    const { isLoading, error, data } = useQuery('GetUserHomeInformation', () => postData('Person/GetUserHomeInformation', new FindCommonUserServicesDto(currentUser?.id, currentUser?.cep)))
    const currentUserData: DisplayInformationHomeUser = data?.data;

    if (isLoading) {
        return (
            <Spinner visible={isLoading} />
        )
    }

    if (currentUserData?.nannyListOrderedByFilter?.length === 0) {
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
                    {currentUserData?.mostRecentService !== null && (
                        <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.seeAll}>Ver todos</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {currentUserData?.mostRecentService === null ? (
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
                {/* Alterar para caso realmente exista um último serviço: se não existir, verificar como mostrar isso ao usuário */}
            </View>
            <View style={{ flex: 0.6 }}>

                <Text style={[globalStyles.headerTitle, { textAlign: 'left', marginVertical: 20 }]}>Procurar a melhor babá</Text>

                <ListFilterNanny />

                {currentUserData?.nannyListOrderedByFilter && (
                    <NannyCardList nannyList={currentUserData?.nannyListOrderedByFilter} />
                )}

            </View>

        </Background>
    )
}
