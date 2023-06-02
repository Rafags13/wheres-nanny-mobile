import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { useQuery } from "react-query";
import Background from "../../components/Background";
import { getData } from "../../services/apiRequests";

export default function NannyInformations() {
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    const { data } = useQuery('nanny', () => getData(`Person/GetNannyById/${params.nannyId}`));
    console.log(data) // TODO: show nanny information by this id
    return (
        <Background hasBackIcon>
            <Text>Nanny Informations works!</Text>
        </Background>
    )
}