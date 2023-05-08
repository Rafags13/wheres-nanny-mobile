import { Rating } from "react-native-ratings";

type Props = {
    rating: number,
    backgroundColorStars?: string,
    tintBackgroundColorStar?: string
}

export default function Stars({ rating, backgroundColorStars = 'red', tintBackgroundColorStar = "#c4c4c4" }: Props) {
    return (
        <Rating
            type="custom"
            fractions={2}
            imageSize={20}
            startingValue={rating}
            ratingCount={5} readonly
            ratingColor='#F2A64E'
            ratingBackgroundColor={backgroundColorStars}
            tintColor={tintBackgroundColorStar}
        />
    );
}