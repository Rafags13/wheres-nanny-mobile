import { Text, View } from "react-native";
import { globalStyles, text } from "@styles/global.styles";
import Button from "@components/Button";
import { styles } from "./style";

export default function NotFoundService() {
    return (
        <View style={styles.notFoundServiceContainer}>
            <Text style={globalStyles.headerSubtitle}>
                Nenhum serviço encontrado
            </Text>
            <Text style={text.common}>
                Nenhum serviço foi encontrado na sua conta.
                Escolha uma das melhores babás, abaixo e as contrate.
            </Text>
        </View>
    )
}