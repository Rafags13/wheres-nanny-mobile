import { CommonActions, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { logOut } from "../../storage";

export default function Dashboard() {
    const navigation = useNavigation<any>();
    return (
        <View>
            <Text>Dashboard works</Text>
            <Button label={"Sair"} onClick={() => {
                logOut();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'login' },
                        ],
                    })
                );
            }} />
        </View>
    )
}