import messaging from '@react-native-firebase/messaging';

export function subscribeForegroundNotification() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        return remoteMessage?.data;

    })

    return unsubscribe;
}