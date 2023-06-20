import { CommonActions, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import { logOut } from "../../storage";

export default function Dashboard() {
    const navigation = useNavigation<any>();
    return (
        <View>
            <Text>Dashboard works</Text>

        </View>
    )
}