import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import LoadingProvider from './context/LoadingContext';
import Routes from './routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ModalProvider>
          <LoadingProvider>
            <Routes />
          </LoadingProvider>
        </ModalProvider>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}
