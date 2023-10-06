import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";

type Props = {
    onComplete: (value: boolean) => void
}

export default function Splash({ onComplete }: Props) {

    return (
        <AnimatedLottieView
            speed={1}
            autoPlay
            loop={false}
            style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },]}
            source={require('@lottie/splash.json')}
            onAnimationFinish={() => onComplete(true)}
        />
    )
}