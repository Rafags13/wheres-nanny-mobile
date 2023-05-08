import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Stars from "../../components/Stars";
import StarPicker from "../../components/StarPicker";
import Background from "../../components/Background";
import Feather from 'react-native-vector-icons/Feather';
import { storage, TOKEN, USER } from "../../storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RecentCard from "./RecentCard";


export default function Home() {

    return (
        <Background
            // hasBackIcon
            header={
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, height: 44 }}>
                        <Feather name="bell" color={"#c4c4c4"} size={24} />
                    </TouchableOpacity>

                    <View >
                        <Text style={{ fontSize: 24, color: '#192553', fontWeight: 'bold', textAlign: 'center' }}>Campo Grande</Text>
                        <Text style={{ fontSize: 18, color: '#999', fontWeight: '500', textAlign: 'center' }}>130 ofertas</Text>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, height: 44 }}>
                        <Feather name="search" color={"#c4c4c4"} size={24} />
                    </TouchableOpacity>
                </View>
            }
        >
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 }}>
                    <Text style={{ color: '#192553', fontWeight: 'bold', fontSize: 24 }}>Recente</Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#3FA0EB', fontWeight: 'bold', fontSize: 16 }}>Ver todos</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Stars rating={4.5} tintBackgroundColorStar={'#3FA0EB'} backgroundColorStars={"#c4c4c4"} />
                            <Text style={{ marginLeft: 10 }}>4.5 (30)</Text>
                        </View> */}

                <RecentCard nannyName={"Emma Nilson"} serviceDate={"22/09/2004 às 19:30:31"} />
            </View>
        </Background>
    )
}