import Chat from "@pages/Chat";
import CurrentServiceNanny from "@pages/CurrentServiceNanny";
import CurrentServiceParent from "@pages/CurrentServiceParent";
import WaitingServicePage from "@pages/WaitingService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ChatDerivatedPages() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="currentServiceNanny" component={CurrentServiceNanny} />
            <Stack.Screen name="currentServiceParent" component={CurrentServiceParent} />
            <Stack.Screen name="waitingService" component={WaitingServicePage} />
            <Stack.Screen name="chat" component={Chat} />
        </Stack.Navigator>
    )
}