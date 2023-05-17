import { Text, TouchableOpacity, View, FlatList } from "react-native";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import { getCurrentUser, getToken } from "../../storage";
import RecentCard from "./RecentCard";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./style";
import NannyCardList from "../../components/NannyCardList";
import { NannyCardProps } from "../../components/NannyCard";
import ListFilterNanny from "../../components/ListFilterNanny";
import { postData } from "../../services/apiRequests";
import { FindCommonUserServicesDto } from "../../dto/Person/FindCommonUserServicesDto";
import { useQuery } from "react-query";

const NANNYS: NannyCardProps[] = [
    {
        fullname: 'Eva Olsen',
        starsCounting: 5,
        rankCommentCount: "25"
    },
    {
        fullname: 'German Miller',
        starsCounting: 4.25,
        rankCommentCount: "0"
    },
    {
        fullname: 'German Miller',
        starsCounting: 4.25,
        rankCommentCount: "0"
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
export default function Home() {
    const currentUser = getCurrentUser();
    const { isLoading, error, data } = useQuery('getInfoUser', () => postData('Person/GetUserHomeInformation', new FindCommonUserServicesDto(currentUser?.id, currentUser?.cep)))

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
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.seeAll}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                <RecentCard nannyName={"Emma Nilson"} serviceDate={"22/09/2004 às 19:30:31"} />
            </View>
            <View style={{ flex: 0.6 }}>

                <Text style={[globalStyles.headerTitle, { textAlign: 'left', marginVertical: 20 }]}>Procurar a melhor babá</Text>

                <ListFilterNanny />

                <NannyCardList nannyList={NANNYS} />
            </View>

        </Background>
    )
}