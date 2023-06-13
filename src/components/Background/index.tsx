import { useNavigation } from "@react-navigation/native";
import { ReactNode } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from "./style";

type Props = {
    children: ReactNode,
    hasBackIcon?: boolean,
    header?: ReactNode,
    isScroll?: boolean
}

export default function Background({ children, header, hasBackIcon = false, isScroll = false }: Props) {
    const navigator = useNavigation<any>();

    return (

        <DefineView isScroll={isScroll}
        >
            <View >
                {hasBackIcon ? (
                    <View>
                        <TouchableOpacity style={styles.backButtonHeader} onPress={() => navigator.goBack()}>
                            <Entypo name="chevron-small-left" size={32} color={"#c4c4c4"} />
                        </TouchableOpacity>
                    </View>
                ) :
                    (
                        <>
                            {header}
                        </>
                    )

                }
            </View>

            {children}
        </DefineView>

    )
}

type NewViewProps = {
    children: ReactNode,
    isScroll: boolean
}

function DefineView({ children, isScroll }: NewViewProps) {
    if (isScroll) {
        return (
            <ScrollView style={styles.background}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        )
    }

    return (
        <View style={{
            flex: 1, paddingTop: 10,
            backgroundColor: '#F8FDFE',
        }}>
            {children}
        </View>
    )
}