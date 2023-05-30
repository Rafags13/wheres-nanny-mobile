import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </NavigationContainer>
  );
}
