import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
