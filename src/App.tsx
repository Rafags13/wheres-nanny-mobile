import { NavigationContainer } from '@react-navigation/native';
import ModalProvider from './context/ModalContext';
import LoadingProvider from './context/LoadingContext';
import Routes from './routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import Splash from './pages/Splash';

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
