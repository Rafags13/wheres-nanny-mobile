import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import StackNavigator from './routes/StackNavigator';

const queryClient = new QueryClient()

export default function App() {

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
