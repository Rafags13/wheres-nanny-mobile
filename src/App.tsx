import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import LoadingProvider from './context/LoadingContext';
import Routes from './routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ModalProvider>
            <LoadingProvider>
              <Routes />
            </LoadingProvider>
          </ModalProvider>
        </NavigationContainer>
      </SafeAreaProvider >
    </GestureHandlerRootView>
  );
}
