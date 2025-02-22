import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'

import MasonryList from '@react-native-seoul/masonry-list';
import { ScrollView } from 'react-native-gesture-handler';

const Serach = () => {
    const route = useRoute()
    let { data } = route.params
    console.log(data)
    let [dataitems, setdataitems] = useState([])
    let [loading, setloading] = useState(false)
    let navigation = useNavigation()
    async function fetch() {
        setloading(true)
        await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${data}`).then((res) => {
            setdataitems(res.data.meals)
        }).catch((error) => {
            console.log(error)
        })
        setloading(false)

    }

    useEffect(() => {
        fetch()
    }, [data])
    console.log(dataitems, 'ans of serach result ')

    if (dataitems==null) {
        return (
            <Text
                style={{
                    textAlign: 'center',
                    fontFamily: 'mono',
                    fontSize: 17,
                    fontStyle: 'italic',
                    fontWeight: 900
                }}
            >
                Data is not available
            </Text>
        )
    }
    return (
        <SafeAreaView>
            <View >
                {loading ? (<ActivityIndicator size='large' color="orange" />) : (

                    <ScrollView>

                        <MasonryList
                            data={dataitems}
                            renderItem={({ item, index }) => (


                                <TouchableOpacity

                                    onPress={() => {
                                        navigation.navigate('Detail', { id: item.idMeal })
                                    }}
                                    key={index}
                                    style={{
                                        margin: '5%',
                                        width: 150,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.strMealThumb }}
                                        style={{
                                            width: '100%',
                                            height: Math.floor(Math.random() * (320 - 180 + 1)) + 150,
                                            resizeMode: 'cover',
                                            borderRadius: 20,
                                        }}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontFamily: 'mono',
                                            fontStyle: 'italic',
                                            fontWeight: 900,
                                            fontSize: 18,
                                        }}
                                    >
                                        {item.strMeal}
                                    </Text>
                                </TouchableOpacity>

                            )}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{
                                padding: '2%',
                            }} />
                    </ScrollView>

                )}

            </View>


        </SafeAreaView>
    )
}

export default Serach

const styles = StyleSheet.create({})