import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import LoadingProvider from './context/LoadingContext';
import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <LoadingProvider>
          <Routes />
        </LoadingProvider>
      </ModalProvider>
    </NavigationContainer>
  );
}
