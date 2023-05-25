import AnimatedLoader from "react-native-animated-loader";

type Props = {
    visible: boolean
}

export default function Spinner({ visible }: Props) {
    return (
        <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../lottie/9764-loader.json")}
            animationStyle={{ width: 150, height: 150 }}
            speed={1}
        >
        </AnimatedLoader>

    )
}