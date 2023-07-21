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
                Clique no botão abaixo e contrate um serviço,
                ou escolha uma das babás abaixo e as contrate.
            </Text>
            <Button label={"Encontrar babá"} onClick={() => { }} />
            {/* TODO: Implement this in future, if required. */}
        </View>
    )
}