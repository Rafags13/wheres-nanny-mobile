import { Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import RecentCard from "@components/RecentCard";
import { globalStyles } from "@styles/global.styles";
import { styles } from "./style";
import NannyCardList from "@features/listNanny/NannyCardList";
import ListFilterNanny from "@components/ListFilterNanny";
import ErrorModal from "@components/ErrorModal";
import { useNavigation } from "@react-navigation/native";
import NotFoundService from "@components/NotFoundService";
import { Background } from "@components/Background";
import useHomeInformation from "../../hooks/useHomeInformation";
import { Skeleton } from 'moti/skeleton'
import Loader from "@components/Loader";

export default function Home() {
    const navigator = useNavigation<any>();

    const { currentInformation, error, isLoadingData, nannyList } = useHomeInformation();


    // TODO: change this to skeleton

    if (error) {
        return (
            <ErrorModal />
        )
    }

    return (
        <Background.ScrollView>

            <Background.Header>
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
            </Background.Header>

            <View style={{ padding: 10, marginTop: 10, gap: 15 }}>
                <Skeleton.Group show={isLoadingData}>
                    <Loader>
                        <View style={{ gap: 15 }}>
                            <View style={styles.recentContainer}>
                                <Text style={globalStyles.headerTitle}>Recente</Text>
                                {currentInformation.mostRecentService !== null && (
                                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => navigator.navigate('services')}>
                                        <Text style={styles.seeAll}>Ver todos</Text>
                                    </TouchableOpacity>
                                )}
                            </View>


                            {(currentInformation.mostRecentService === null && isLoadingData) ?
                                (
                                    <NotFoundService />

                                )
                                : (<RecentCard
                                    nannyName={currentInformation?.mostRecentService?.personName as string}
                                    serviceDate={currentInformation.mostRecentService?.date as Date}
                                    serviceId={currentInformation.mostRecentService?.serviceId as number}
                                    imageUri={currentInformation.mostRecentService?.imageUri as string} />)}
                        </View>
                    </Loader>
                    <View style={{ gap: 15 }}>
                        <Loader>
                            <>
                                <Text style={styles.findBetterNannyLabel}>Procurar a melhor babá</Text>

                                <ListFilterNanny />
                            </>
                        </Loader>
                        <Loader width={'100%'} height={200}>
                            <NannyCardList nannyList={nannyList} />
                        </Loader>

                    </View>
                </Skeleton.Group>
            </View>
        </Background.ScrollView>
    )
}
