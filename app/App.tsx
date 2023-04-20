import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView, Text
} from 'react-native';
import LoggedTab from './routes/LoggedTab';

export default function App() {
  return (
    <NavigationContainer>
      <LoggedTab />
    </NavigationContainer>
  );
}
