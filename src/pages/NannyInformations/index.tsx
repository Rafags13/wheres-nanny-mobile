import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import Background from "../../components/Background";

export default function NannyInformations() {
    const { params } = useRoute<RouteProp<{ params: { nannyId: number } }, 'params'>>();
    console.log(params.nannyId) // TODO: show nanny information by this id
    return (
        <Background hasBackIcon>
            <Text>Nanny Informations works!</Text>
        </Background>
    )
}