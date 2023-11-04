import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { AppProvider } from './context';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}
