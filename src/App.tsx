import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import LoadingProvider from './context/LoadingContext';
import Routes from './routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
