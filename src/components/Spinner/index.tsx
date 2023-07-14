import { useContext } from "react";
import AnimatedLoader from "react-native-animated-loader";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";

export default function Spinner() {
    const { isLoading } = useContext(LoadingContext) as LoadingContextType;
    return (
        <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../assets/lottie/9764-loader.json")}
            animationStyle={{ width: 150, height: 150 }}
            speed={1}
        >
        </AnimatedLoader>

    )
}