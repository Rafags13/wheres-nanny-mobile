import { CommonActions, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import Button from "../../components/Button";
import { logOut } from "../../storage";

export default function Profile() {
    const navigation = useNavigation<any>();
    return (
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
    )
}