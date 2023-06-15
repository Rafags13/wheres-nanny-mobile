import { useNavigation } from "@react-navigation/native";
import { ReactNode } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from "./style";

type Props = {
    children: ReactNode,
    hasBackIcon?: boolean,
    scrollviewRef?: any,
    header?: ReactNode,
    isScroll?: boolean
}

export default function Background({ children, header, hasBackIcon = false, isScroll = false, scrollviewRef }: Props) {
    const navigator = useNavigation<any>();

    return (

        <DefineView isScroll={isScroll}
            scrollviewRef={scrollviewRef}
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

            {children}
        </DefineView>

    )
}

type NewViewProps = {
    children: ReactNode,
    isScroll: boolean,
    scrollviewRef?: any
}

function DefineView({ children, isScroll, scrollviewRef = null }: NewViewProps) {
    if (isScroll) {
        return (
            <ScrollView style={styles.background}
                ref={scrollviewRef}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            >
                {children}
            </ScrollView>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#F8FDFE',
        }}>
            {children}
        </View>
    )
}