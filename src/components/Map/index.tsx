import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { PermissionsAndroid } from 'react-native';
import { API_GOOGLE_MAP_KEY } from '@env';

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
    },
    distanceHigherThenOneKilometer?: boolean
}

export default function GoogleMap({ originCoordinates, destinationCoordinates, distanceHigherThenOneKilometer = false }: Props) {
    const refMap = useRef<any>(null);

    useEffect(() => {
        async function requestGeolocationPermission() {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
        }

        requestGeolocationPermission();
    }, [])

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...originCoordinates,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            showsUserLocation={true}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
            ref={ref => refMap.current = ref}
        >
            <MapViewDirections
                origin={originCoordinates}
                destination={destinationCoordinates}
                apikey={API_GOOGLE_MAP_KEY}
                strokeWidth={4}
                strokeColor="#999"
                onReady={result => {
                    const padding = distanceHigherThenOneKilometer ? 20 : 5;
                    refMap.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            right: (width / padding),
                            bottom: (height / padding),
                            left: (width / padding),
                            top: (height / padding),
                        }
                    });
                }}
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
