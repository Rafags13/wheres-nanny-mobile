import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import Stars from "../../components/Stars";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import { getCurrentUser, storage, USER } from "../../storage";
import RecentCard from "./RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import jwt_decode from "jwt-decode";

const LABELS = [
    {
        icon: <Ionicons name={"location"} size={24} color={'#D5493C'} />,
        label: 'Mais próximo de mim'
    },
    {
        icon: <FontAwesome5 name={"money-bill-wave"} size={24} color={'#85bb65'} />,
        label: 'Preço mais acessível'
    },
    {
        icon: <AntDesign name={"star"} size={24} color={'#FFCD3C'} />,
        label: 'Maior pontuação'
    },
];

const NANNYS = [
    {
        imageUri: '',
        fullname: 'Eva Olsen',
        work: 'babá',
        starsCounting: 5,
        rankCommentCount: 25
    },
    {
        imageUri: '',
        fullname: 'German Miller',
        work: 'babá',
        starsCounting: 4.25,
        rankCommentCount: 37
    },
]; // API DATA


const orderByNearCep = () => { // important function from backend
    const needle = 8;
    const numbers = [1, 10, 7, 2, 4, 9];

    numbers.sort((a, b) => {
        return Math.abs(needle - a) - Math.abs(needle - b);
    })

    console.log(numbers[0]);
}

const currentUser = getCurrentUser();

export default function Home() {
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
            <View style={{ marginTop: 20 }}>
                <View style={styles.recentContainer}>
                    <Text style={globalStyles.headerTitle}>Recente</Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>


                <RecentCard nannyName={"Emma Nilson"} serviceDate={"22/09/2004 às 19:30:31"} />
            </View>

            <View style={styles.findBetterNannyOption}>
                <Text style={[globalStyles.headerTitle, { textAlign: 'left', marginBottom: 20 }]}>Procurar a melhor babá</Text>

                <FlatList
                    data={LABELS}
                    renderItem={(item) => {
                        const { icon } = item.item;
                        return (
                            <TouchableOpacity style={styles.labels}>
                                {icon}
                                <Text style={{ color: '#192553', fontSize: 16 }}>{item.item.label}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 20 }}
                />

                <FlatList
                    data={NANNYS}
                    renderItem={(item) => {
                        return (
                            <TouchableOpacity style={[styles.labels, { marginBottom: 20 }]}>
                                <Image style={styles.personPhoto} source={{ uri: `data:image/png;base64,${USER?.imageUri}` }} />

                                <View>
                                    <Text style={styles.fullnameNannyItem}>{item.item.fullname}</Text>
                                    <Text style={styles.workNannyItem}>{item.item.work}</Text>
                                    <View style={styles.starsNannyCountingContainer}>
                                        <Stars rating={item.item.starsCounting} tintBackgroundColorStar={'white'} backgroundColorStars={"#c4c4c4"} />
                                        <Text style={styles.starsNannyCouting}>{item.item.starsCounting} ({item.item.rankCommentCount})</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    style={{ marginBottom: 20 }}
                />
            </View>
        </Background>
    )
}