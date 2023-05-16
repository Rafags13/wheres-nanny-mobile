import { FlatList, ListRenderItem, ListRenderItemInfo } from "react-native"
import NannyCard, { NannyCardProps } from "../NannyCard"

type Props = {
    nannyList: NannyCardProps[]
}

const RenderedItem = (item: any) => {
    return (
        <NannyCard fullname={item.fullname} starsCounting={item.starsCounting} rankCommentCount={item.rankCommentCount} />
    )
}

export default function NannyCardList({ nannyList }: Props) {
    return (
        <FlatList
            data={nannyList}
            renderItem={(item: ListRenderItemInfo<NannyCardProps>) => {
                const { fullname, rankCommentCount, starsCounting } = item.item;

                return (
                    <NannyCard fullname={fullname} starsCounting={starsCounting} rankCommentCount={rankCommentCount} />
                )
            }}
            style={{ marginBottom: 20, maxHeight: 150 }}
        />
    )
}