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

export default function ServiceEarns() {
  const { params: { countingService, monthIndex } } = useRoute<RouteProp<{ params: { monthIndex: number, countingService: number } }, 'params'>>();

  // const { isLoading, data} = useQuery(['earnsFromNanny', params.monthIndex], () => {
  //   const response
  // });

  return (
    <Background.View>
      <Background.BackHeader title={"Novembro"} />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between' }}>
        <View >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Seus Ganhos</Text>
            <FontAwesome name="dollar" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />
          <View style={{ marginVertical: 10 }}>

            <Text style={globalStyles.label}>Preço por serviço: {formatCurrency(300)}</Text>
            <Text style={globalStyles.label}>Famílias atendidas: {countingService}</Text>
            <Text style={globalStyles.label}>Total: <Text style={styles.nameOfHigherPayer}>{formatCurrency(300 * countingService)}</Text></Text>
          </View>

        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Maior Cliente</Text>
            <Ionicons name="person" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />

          <View style={{ marginLeft: 10, marginVertical: 10 }}>
            <Text style={text.common}>Cliente: <Text style={styles.nameOfHigherPayer}>Rafael Veiga!!!</Text></Text>
            <Text style={text.common}>Trabalham Juntos Desde:  <Text style={styles.nameOfHigherPayer}>{capitalize(moment(new Date()).format('MMMM [de] YYYY'))}</Text></Text>

          </View>
        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ranking (Top 3)</Text>
            <Ionicons name="podium" size={20} color='#192553' />
          </View>
          <Line styles={{ backgroundColor: '#192553' }} />

          <MainPayerCard imageUri={""} name={"Rafael Veiga"} totalPayment={300.05} dateFromFirstHire={new Date()} serviceId={0} position={1} />
          <MainPayerCard imageUri={""} name={"Rafael Veiga"} totalPayment={300.05} dateFromFirstHire={new Date()} serviceId={0} position={2} />
          <MainPayerCard imageUri={""} name={"Rafael Veiga"} totalPayment={300.05} dateFromFirstHire={new Date()} serviceId={0} position={3} />

        </View>
      </View>
    </Background.View>
  )
}