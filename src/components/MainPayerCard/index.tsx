import Line from "@components/Line";
import { Dictionary } from "@models/dictionary";
import { useNavigation } from "@react-navigation/native";
import { globalStyles, text } from "@styles/global.styles";
import { formatCurrency } from "@util/functions";
import moment from "moment";
import { ColorValue, Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./style";

type MainPayerCardProps = {
  serviceId: number,
  imageUri: string,
  name: string,
  totalPayment: number,
  dateFromFirstHire: Date,
  position: number,
}

export default function MainPayerCard({ imageUri, name, totalPayment, dateFromFirstHire, serviceId, position }: MainPayerCardProps) {
  const { navigate } = useNavigation<any>();

  const onServiceInformation = () => {
    navigate('serviceInformation', { serviceId, isCommonUser: false })
  }

  const positionToColorFromTrophy: Dictionary<string> = {
    1: '#FAD761',
    2: '#B7BBC6',
    3: '#AE693C'
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onServiceInformation}>

      <Image style={globalStyles.personPhotoSmall} source={{ uri: `data:image/png;base64,${imageUri}` }} />
      <View style={{ gap: 5 }}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Ionicons name="trophy" color={positionToColorFromTrophy[position] as ColorValue} size={20} />
        </View>
        <Text style={text.common}>Último serviço: {moment(dateFromFirstHire).format('DD/MM/YYYY [às] HH:mm')}</Text>
        <Text style={text.common}>Valor total: {formatCurrency(totalPayment)}</Text>
      </View>
    </TouchableOpacity>
  )
}

