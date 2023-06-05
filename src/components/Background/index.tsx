import { useNavigation } from "@react-navigation/native";
import { ReactNode } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from "./style";

type Props = {
    children: ReactNode,
    hasBackIcon?: boolean,
    header?: ReactNode,
}

export default function Background({ children, header, hasBackIcon = false }: Props) {
    const navigator = useNavigation<any>();

    return (

        <ScrollView style={styles.background}
            showsVerticalScrollIndicator={false}
        >
            <View>
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

            <View
            >
                {children}
            </View>
        </ScrollView>

    )
}