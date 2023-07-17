import AnimatedLottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";

type Props = {
    isFavorited: boolean,
    setIsFavorited: (value: boolean) => void,
    style?: StyleProp<ViewStyle>,
}

export default function Heart({ isFavorited, setIsFavorited, style }: Props) {
    const [animation, setAnimation] = useState<AnimatedLottieView | null>(null);

    useEffect(() => {
        if (!animation) return;

        if (isFavorited) {
            animation?.play();
        } else {
            animation?.reset();
        }

    }, [isFavorited, animation]);

    return (
        <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            <AnimatedLottieView
                speed={1.5}
                autoPlay={false}
                loop={false}
                style={[{ width: 70 }, style]}
                ref={(animation) => setAnimation(animation)}
                source={require('../../assets/lottie/explodingHeart.json')}
            />
        </TouchableOpacity>
    )
}