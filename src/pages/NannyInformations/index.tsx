import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { Background } from "@components/Background";
import Button from "@components/Button";
import Stars from "@components/Stars";
import { NannyContractDto } from "@dtos/Person/NannyContractDto";
import { globalStyles, text } from "@styles/global.styles";
import { Slider } from '@miblanchard/react-native-slider';
import Feather from 'react-native-vector-icons/Feather'
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";
import { getCurrentUserAsync } from "@storage/index";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formatCellphoneNumber } from "@util/functions";
import moment from "moment";
import { ModalType, useModal } from "@context/ModalContext";
import { useDispatch, } from "react-redux";
import { addFavoriteNanny, FavoritedNanny, removingFavoriteFromNanny } from '@features/listNanny/favoriteListNannySlice';
import Heart from "@components/Heart";
import { useAppSelector } from "@app/hooks";
import { getNannyById } from "@services/requests/NannyRequests";
import { CreateContractNannyDto } from "@dtos/Nanny/CreateContractNannyDto";
import { hireNanny } from "@services/requests/ServiceRequests";
import { Skeleton } from "moti/skeleton";
import Loader from "@components/Loader";
import useFakeApiCallRequests from "@hooks/useFakeApiCallRequest";

function NannyInformationsSkeleton() {
    return (
        <Skeleton.Group show={true}>
            <View style={{ alignSelf: 'center', paddingHorizontal: 15 }}>
                <Loader height={100} width={'100%'} />
            </View>

            <LinearGradient colors={['white', '#F6F6F6']} style={[styles.mainContentContainer]}>
                <View style={{ padding: 15 }}>
                    <Loader width={200} />
                    <View style={{ marginVertical: 10, gap: 5 }}>
                        <Loader height={20} width={150} />
                        <Loader height={20} width={150} />
                    </View>

                    <View style={{ gap: 10, marginBottom: 30 }}>

                        <Loader width={200} />
                        <Loader width={'100%'} height={40} />
                    </View>

                    <View style={{ gap: 15 }}>

                        <Loader width={100} height={30} />

                        <View style={styles.dateTimeContainer}>
                            <Loader width={100} height={60} radius={20} />
                            <Loader width={100} height={60} radius={20} />
                        </View>
                    </View>

                </View>
            </LinearGradient>
            <View style={styles.finalPriceContractNannyContainer}>
                <Loader height={60} width={100} />

                <Loader height={60} width={150} />
            </View>
        </Skeleton.Group>
    )
}

export default function NannyInformations() {
    const dispatch = useDispatch<any>();
    const currentUser = getCurrentUserAsync();
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    const currentNanny = useAppSelector((state) => state.favoriteNannies.listFavoriteNanny.find(x => x.id === params.nannyId));
    const { showModal } = useModal();
    const [date, setDate] = useState<Date>(new Date());
    const { data, isLoading } = useQuery('nanny', async () => {
        var data = await getNannyById(params?.nannyId);
        return data
    });
    const nannyInformation: NannyContractDto = data?.data;
    const navigation = useNavigation<any>();

    function openDatePicker(mode: 'date' | 'time') {
        DateTimePickerAndroid.open({
            mode,
            value: date,
            is24Hour: true,
            minimumDate: new Date(),
            onChange: (event, date) => {
                if (event.type !== 'dismissed' && (date as Date) < new Date()) {
                    showModal({ message: 'Não é possível escolher uma data menor ou igual à data atual. Tente novamente.', modalType: ModalType.ERROR });
                    return;
                }
                setDate(date as Date)
            },
        });
    }

    async function contractNanny() {
        const createContractNanny: CreateContractNannyDto = createHireNannyModel();

        const response = hireNanny(createContractNanny);
        response.then(async response => {

            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'chatDerivatedPages' },
                    ],
                })
            );
        }).catch((err) => {
            showModal({ modalType: ModalType.ERROR, message: err.response.data });
        })

    }

    function createHireNannyModel() {
        const createContractNanny: CreateContractNannyDto = {
            serviceFinishHour: date,
            hiringDate: date,
            price: nannyInformation.servicePrice,
            personId: currentUser.id,
            nannyId: nannyInformation.nannyId
        }

        return createContractNanny;
    }

    return (
        <Background.View>
            <Background.BackHeader title="Serviço" />
            {isLoading ? (<NannyInformationsSkeleton />) : (
                <>
                    <View style={styles.basicNannyInformationSection}>
                        <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${nannyInformation.imageProfileBase64Uri}` }} />
                        <View style={styles.nameAndRatingContainer}>
                            <Text style={styles.nannyName}>{nannyInformation.person.name}</Text>
                            <Text style={styles.workAlias}>babá</Text>
                            <View style={styles.starsRatingContainer}>
                                <Stars rating={nannyInformation.rankAverageStars} />
                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 3,
                                    flexDirection: 'row',
                                    gap: 5,
                                }}>
                                    <Text style={styles.textStarsNumber}>{nannyInformation.rankAverageStars.toString()}</Text>
                                    <Text style={styles.textStarsNumber}>({nannyInformation.rankCommentCount.toString()})</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.absoluteHeart}>
                            <Heart isFavorited={currentNanny?.isFavorited ?? false} setIsFavorited={(isFavoriting) => {
                                if (isFavoriting) {
                                    var newFavoriteNanny: FavoritedNanny = {
                                        id: nannyInformation.nannyId,
                                        fullname: nannyInformation.person.name,
                                        starsCounting: nannyInformation.rankAverageStars,
                                        rankCommentCount: nannyInformation.rankCommentCount.toString(),
                                        imageUri: nannyInformation.imageProfileBase64Uri,
                                        isFavorited: true
                                    }
                                    dispatch(addFavoriteNanny(newFavoriteNanny));
                                } else {
                                    dispatch(removingFavoriteFromNanny(nannyInformation?.nannyId));
                                }
                            }} />
                        </View>
                    </View>
                    <LinearGradient colors={['white', '#F6F6F6']} style={styles.mainContentContainer}>
                        <View style={{ padding: 15 }}>
                            <Text style={styles.titleLabels}>Informações de contato</Text>
                            <View style={styles.contactNannyContainer}>
                                <Text style={text.common}>
                                    Telefone: {formatCellphoneNumber(nannyInformation.person.cellphone)}
                                </Text>
                                <Text style={text.common}>
                                    E-mail: {nannyInformation.person.email}
                                </Text>
                            </View>
                            <Text style={styles.titleLabels} >Área de trabalho</Text>
                            <Slider
                                value={Number(nannyInformation.address.distanceBetweenThePeople)}
                                maximumValue={10000}
                                onValueChange={value => { }}
                                thumbTintColor={'#409FEA'}
                                minimumTrackTintColor={'#409FEA'}
                                maximumTrackTintColor={'#ECEEF8'}
                                disabled
                                renderBelowThumbComponent={
                                    () => (
                                        <View style={{ width: 200, left: -100, alignItems: 'center', marginBottom: 20, }}>
                                            <Text style={text.common}>{nannyInformation.address.distanceBetweenThePeople} m</Text>
                                        </View>
                                    )
                                }
                                thumbStyle={{
                                    backgroundColor: '#409FEA',
                                    borderColor: 'white',
                                    borderRadius: 30 / 2,
                                    borderWidth: 3,
                                    height: 25,
                                    width: 25,
                                    ...globalStyles.shadow
                                }}
                            />
                            <Text style={styles.dateTimeTitle}>Data e Hora</Text>
                            <View style={styles.dateTimeContainer}>
                                <TouchableOpacity style={styles.dateTimeComponent} onPress={() => openDatePicker('date')}>
                                    <View style={styles.iconContainer}>
                                        <Feather name='calendar' color='white' size={24} />
                                    </View>
                                    <Text style={[text.common]}>{moment(date).format('DD/MM/YYYY')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dateTimeComponent} onPress={() => openDatePicker('time')}>
                                    <View style={styles.iconContainer}>
                                        <Feather name='clock' color='white' size={24} />
                                    </View>
                                    <Text style={[text.common, { alignSelf: 'center', marginHorizontal: 10 }]}>{moment(date).format('HH:mm')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.finalPriceContractNannyContainer}>
                        <View>
                            <Text style={[globalStyles.headerSubtitle, { alignSelf: "flex-start" }]}>Preço</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={globalStyles.headerTitle}>R$ {nannyInformation.servicePrice}</Text>
                                <Text style={[globalStyles.headerTitle, { fontSize: 14, alignSelf: 'center' }]}>/Dia</Text>
                            </View>
                        </View>
                        <Button containerStyle={{ maxWidth: 150, borderRadius: 15, height: 60 }} textStyle={{ fontSize: 16 }} label={"Contratar agora"} onClick={contractNanny} />
                    </View>
                </>
            )}

        </Background.View>
    )
}