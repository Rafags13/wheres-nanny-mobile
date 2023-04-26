import { Text } from "react-native";
import { storage } from "../../storage";

export default function Home() {
    console.log(storage.getString('token'))
    return (
        <Text>Home</Text>
    )
}