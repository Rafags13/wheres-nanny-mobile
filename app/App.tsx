import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </NavigationContainer>
  );
}
