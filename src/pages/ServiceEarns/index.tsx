import { Background } from "@components/Background";
import Line from "@components/Line";
import MainPayerCard from "@components/MainPayerCard";
import ServiceNannyCard from "@components/ServiceNannyCard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { globalStyles, text } from "@styles/global.styles";
import { Text, View } from "react-native";
import { useQuery } from "react-query";
import styles from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import { capitalize, formatCurrency } from "@util/functions";
import { getData } from "@services/apiRequests";
import { getCurrentUserAsync } from "@storage/index";
import { NannyEarnDto } from "@models/dto/Nanny/NannyEarnDto";
import { useLoading } from "@context/LoadingContext";
import Loader from "@components/Loader";

export default function ServiceEarns() {
  const currentUser = getCurrentUserAsync();
  const { params: { countingService, monthIndex } } = useRoute<RouteProp<{ params: { monthIndex: number, countingService: number } }, 'params'>>();
  const { isLoading, data } = useQuery<NannyEarnDto, Error>(['earnsFromNanny', monthIndex], async () => {
    const response = await getData(`Nanny/GetEarnsByMonth/${monthIndex}/${currentUser.id}`);

    return response.data;
  });

  return (
    <Background.ScrollView>
      <Background.BackHeader title={capitalize(moment().month(monthIndex - 1).format('MMMM'))} />

      <View style={{ gap: 20, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between' }}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Ganhos</Text>
            <FontAwesome name="dollar" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />
          <View style={{ marginVertical: 10 }}>

            <Loader show={isLoading} height={20} width={200}>
              <Text style={globalStyles.label}>Famílias atendidas: {countingService} </Text>
            </Loader>
            <Loader show={isLoading} height={20} width={150}>
              <Text style={globalStyles.label}>Total: <Text style={styles.nameOfHigherPayer}>{formatCurrency(data?.totalEarn as number)}</Text></Text>
            </Loader>
          </View>

        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Maior Cliente</Text>
            <Ionicons name="person" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />

          <View style={{ marginLeft: 10, marginVertical: 10 }}>
            <Loader show={isLoading} height={20}>

              <Text style={text.common}>Cliente: <Text style={styles.nameOfHigherPayer}>{data?.mainPeopleWhoHireHer[0].name}!!!</Text></Text>
            </Loader>
            <Loader show={isLoading} height={20}>

              <Text style={text.common}>Trabalham Juntos Desde: <Text style={styles.nameOfHigherPayer}>
                {capitalize(moment(data?.mainPeopleWhoHireHer[0].dateFromFirstHire).format('MMMM [de] YYYY'))}
              </Text>
              </Text>
            </Loader>

          </View>
        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ranking (Top 3)</Text>
            <Ionicons name="podium" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />
          <View style={{ marginVertical: 10 }}>
            {isLoading ? (
              <View style={{ gap: 10 }}>
                <View style={{ padding: 10 }}>
                  <Loader height={70} width={'100%'} />
                </View>
                <View style={{ padding: 10 }}>
                  <Loader height={70} width={'100%'} />
                </View>
                <View style={{ padding: 10 }}>
                  <Loader height={70} width={'100%'} />
                </View>
              </View>
            ) :
              data?.mainPeopleWhoHireHer.map((person, index) => (
                <MainPayerCard key={person.id} imageUri={person.uriClient} name={person.name} totalPayment={person.totalPayment} dateFromFirstHire={person.dateFromFirstHire} serviceId={person.firstServiceId} position={index + 1} />
              ))
            }
          </View>
        </View>
      </View>
    </Background.ScrollView>
  )
}