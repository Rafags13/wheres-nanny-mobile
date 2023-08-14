import { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {
    originCoordinates: {
        latitude: number
        longitude: number
    },
    destinationCoordinates: {
        latitude: number
        longitude: number
    }
}

export default function GoogleMap({ originCoordinates, destinationCoordinates }: Props) {
    const refMap = useRef<any>(null);
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...originCoordinates,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            ref={ref => refMap.current = ref}
        >
            <MapViewDirections
                origin={originCoordinates}
                destination={destinationCoordinates}
                apikey={'AIzaSyB-Z1vHMjuGkZ6ovkcZwypA9KWzS6qU5Rc'}
                strokeWidth={4}
                strokeColor="#999"
                onReady={result => {
                    refMap.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            right: (width / 5),
                            bottom: (height / 5),
                            left: (width / 5),
                            top: (height / 5),
                        }
                    });
                }}
            />
            <Marker coordinate={originCoordinates}
                pointerEvents="none"

            />
            <Marker coordinate={destinationCoordinates}
                pointerEvents="none"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
