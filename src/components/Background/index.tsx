import { useNavigation } from "@react-navigation/native";
import { ReactNode } from "react"
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { globalStyles } from "../../assets/styles/global.styles";
import { styles } from "./style";

type Props = {
    children: ReactNode,
    hasBackIcon?: boolean,
    scrollviewRef?: any,
    label?: string,
    header?: ReactNode,
    isScroll?: boolean
}

export default function Background({ children, header, hasBackIcon = false, isScroll = false, label = '', scrollviewRef }: Props) {
    const navigator = useNavigation<any>();

    return (

        <DefineView isScroll={isScroll}
            scrollviewRef={scrollviewRef}
        >
            <View>
                {hasBackIcon ? (
                    <View style={styles.backIconContainer}>
                        <TouchableOpacity style={styles.backButtonHeader} onPress={() => navigator.goBack()}>
                            <Entypo name="chevron-small-left" size={32} color={"#c4c4c4"} />
                        </TouchableOpacity>

                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                            <Text style={globalStyles.headerTitle}>{label}</Text>
                        </View>
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
        </DefineView >

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