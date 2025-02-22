

import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import heart from '../assets/heart.png'
import React, { useState, useEffect } from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import YoutubePlayer from "react-native-youtube-iframe";
import joke from '../assets/joke.png'
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Detail = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    let route = useRoute()
    let { id } = route.params
    let navigation = useNavigation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setData(response.data.meals[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);
    console.log(data, 'data by id ')
    const storeData = async (data) => {
        try {
            const storedData = await AsyncStorage.getItem('favoriteMeals');
            if (storedData !== null) {
                const parsedData = JSON.parse(storedData);
                parsedData.push(data);
                await AsyncStorage.setItem('favoriteMeals', JSON.stringify(parsedData));
            } else {
                await AsyncStorage.setItem('favoriteMeals', JSON.stringify([data]));
            }
        } catch (error) {
            console.error(error);
        }
    };
    function Extractid(url) {
        if (!url) return null;
        const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regex);
        return match && match[7].length === 11 ? match[7] : null;
    }
    const videoId = Extractid(data?.strYoutube)


    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size='large' color="orange" />

            </View>
        );
    }

    if (!data) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>
                    Not able to fetch data
                </Text>

            </View>
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground
                    source={{ uri: data.strMealThumb }}
                    style={{
                        width: '100%', height: 420,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        overflow: 'hidden'
                    }}
                >

                    <View
                        style={{
                            marginTop: '3%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',

                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack()

                            }}

                            style={{
                                backgroundColor: 'white',
                                padding: '2%',
                                borderRadius: 50
                            }}
                        >

                            <AntDesign name="arrowleft" size={34} color="orange" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                storeData(data);
                                alert('Meal added to favorites!');
                            }}

                            style={{
                                backgroundColor: 'white',
                                padding: '2%',
                                borderRadius: 50
                            }}

                        >
                            {/* <Image


                                source={heart}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            /> */}

                            <Entypo name="heart-outlined" size={30} color="orange" />

                        </TouchableOpacity>
                    </View>


                </ImageBackground>




                <Text

                    style={{
                        padding: '2%',
                        fontFamily: 'serif',
                        fontSize: 20,
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                    }}
                >{data.strMeal}</Text>


                <View

                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}
                >
                    <Text

                        style={{
                            padding: '2%',
                            fontFamily: 'mono',
                            fontSize: 18,
                            fontStyle: 'italic',
                            fontWeight: 500
                        }}
                    >{data.strArea}
                    </Text>


                    {data?.strCategory ? (

                        <>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >


                                <Text
                                    style={{
                                        fontFamily: 'serif',
                                        fontStyle: 'italic',
                                        fontWeight: 900,
                                        color: 'orange'
                                    }}>
                                    {data?.strCategory}
                                </Text>
                                <Image

                                    source={joke}
                                    style={{
                                        width: 55,
                                        height: 55
                                    }}
                                />
                            </View>
                        </>
                    ) : ('')}
                </View>



                <View


                    style={{
                        padding: '2%',
                        marginTop: '4%'
                    }}

                >






                    <Text

                        style={{

                            fontFamily: 'serif',
                            fontSize: 20,
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }}
                    >Ingredients</Text>

                    {data.str}

                    {Object.keys(data).filter(key => key.startsWith('strIngredient') && data[key] !== '').map((key, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '65%', alignItems: 'center', margin: '2%', gap: '4%' }}>
                            <Entypo name="dots-two-horizontal" size={24} color="orange" />
                            <Text style={{ fontFamily: 'mono', fontSize: 15, fontStyle: 'mono', fontWeight: 500 }}>
                                {data[`strMeasure${index + 1}`]}
                            </Text>

                            <Text style={{ fontFamily: 'mono', fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>
                                {data[key]}
                            </Text>
                        </View>
                    ))}

                    <Text
                        style={{
                            marginTop: '4%',
                            fontFamily: 'serif',
                            fontSize: 20,
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }}>
                        Instructions
                    </Text>

                    <Text
                        style={{
                            padding: '3%',
                            fontFamily: 'seirf',
                            fontSize: 18,
                            gap: 10

                        }}
                    >
                        {data.strInstructions}
                    </Text>

                    {data?.strYoutube ? (

                        <>

                            <Text
                                style={{
                                    marginTop: '4%',
                                    fontFamily: 'seirf',
                                    fontSize: 20,
                                    fontWeight: 900,
                                    fontStyle: 'italic'

                                }}>
                                Recipe video
                            </Text>


                            <View
                                style={{
                                    marginTop: '4%'
                                }}
                            >

                                <YoutubePlayer

                                    height={300}

                                    // videoId={"iee2TATGMyI"}
                                    videoId={videoId}

                                />
                                <Text
                                    style={{
                                        color: 'blue',
                                        fontFamily: 'mono',
                                        fontStyle: 'italic',
                                        fontWeight: 900,
                                        fontSize: 12,
                                        textAlign: 'center'
                                    }}
                                    onPress={() => {
                                        Linking.openURL(data?.strYoutube);
                                    }}
                                >{data?.strYoutube}</Text>
                            </View>
                        </>
                    ) : ('')}



                </View>




            </ScrollView>
        </SafeAreaView>
    );
};

export default Detail;