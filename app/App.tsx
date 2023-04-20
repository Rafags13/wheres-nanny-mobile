import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Register from './pages/Register';

const Stack = createNativeStackNavigator();
import LoggedTab from './routes/LoggedTab';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="logged" component={LoggedTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
