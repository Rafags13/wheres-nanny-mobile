import { StarRatingDisplay } from "react-native-star-rating-widget";

type Props = {
    rating: number,
}

export default function Stars({ rating }: Props) {
    return (
        <StarRatingDisplay starStyle={{ marginLeft: 0 }} starSize={24} rating={rating} enableHalfStar />
    );
}