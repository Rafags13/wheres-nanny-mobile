import AnimatedLoader from "react-native-animated-loader";
import { useLoading } from "@context/LoadingContext";

export default function Spinner() {
    const { isLoading } = useLoading();
    return (
        <AnimatedLoader
            visible={isLoading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("@lottie/spinner.json")}
            animationStyle={{ width: 150, height: 150 }}
            speed={1}
        >
        </AnimatedLoader>

    )
}