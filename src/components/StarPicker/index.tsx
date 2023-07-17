import StarRating from "react-native-star-rating-widget";

type Props = {
    rating: number,
    setRating: (rating: number) => void
}

export default function StarPicker({ rating, setRating }: Props) {
    return (
        <StarRating
            rating={rating}
            onChange={setRating}
            starSize={24}
            maxStars={5}
        />
    )
}