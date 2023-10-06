import { IActionProps } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const actions: IActionProps[] = [
    {
        text: 'Abrir Conversa',
        name: "button_chat",
        icon: <Ionicons name="chatbubble-outline" size={24} color={'white'} />,
        animated: true,
    },
    {
        text: 'Cancelar Serviço',
        name: "button_cancel_service",
        color: '#ff6961',
        icon: <MaterialCommunityIcons name="cancel" size={24} color={'white'} />,
        animated: true,
    }
]
