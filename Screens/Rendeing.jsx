import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import MasonryList from '@react-native-seoul/masonry-list';
import FastImage from 'react-native-fast-image';

const Rendeing = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { data } = route.params
    navigation.setOptions({
        title: `${data}   Recipes`
    })
    console.log(data, 'rederng file redcined dprops ')
    const sampleData = [{ "idMeal": "52959", "strMeal": "Baked salmon with fennel & tomatoes", "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg" }, { "idMeal": "52819", "strMeal": "Cajun spiced fish tacos", "strMealThumb": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg" }, { "idMeal": "52944", "strMeal": "Escovitch Fish", "strMealThumb": "https://www.themealdb.com/images/media/meals/1520084413.jpg" }, { "idMeal": "53043", "strMeal": "Fish fofos", "strMealThumb": "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg" }, { "idMeal": "52802", "strMeal": "Fish pie", "strMealThumb": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg" }, { "idMeal": "53079", "strMeal": "Fish Soup (Ukha)", "strMealThumb": "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg" }, { "idMeal": "52918", "strMeal": "Fish Stew with Rouille", "strMealThumb": "https://www.themealdb.com/images/media/meals/vptqpw1511798500.jpg" }, { "idMeal": "52764", "strMeal": "Garides Saganaki", "strMealThumb": "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg" }, { "idMeal": "53041", "strMeal": "Grilled Portuguese sardines", "strMealThumb": "https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg" }, { "idMeal": "52773", "strMeal": "Honey Teriyaki Salmon", "strMealThumb": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg" }, { "idMeal": "52887", "strMeal": "Kedgeree", "strMealThumb": "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg" }, { "idMeal": "52946", "strMeal": "Kung Po Prawns", "strMealThumb": "https://www.themealdb.com/images/media/meals/1525873040.jpg" }, { "idMeal": "52821", "strMeal": "Laksa King Prawn Noodles", "strMealThumb": "https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg" }, { "idMeal": "52777", "strMeal": "Mediterranean Pasta Salad", "strMealThumb": "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg" }, { "idMeal": "53048", "strMeal": "Mee goreng mamak", "strMealThumb": "https://www.themealdb.com/images/media/meals/xquakq1619787532.jpg" }, { "idMeal": "53051", "strMeal": "Nasi lemak", "strMealThumb": "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg" }, { "idMeal": "53045", "strMeal": "Portuguese fish stew (Caldeirada de peixe)", "strMealThumb": "https://www.themealdb.com/images/media/meals/do7zps1614349775.jpg" }, { "idMeal": "52809", "strMeal": "Recheado Masala Fish", "strMealThumb": "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg" }, { "idMeal": "52960", "strMeal": "Salmon Avocado Salad", "strMealThumb": "https://www.themealdb.com/images/media/meals/1549542994.jpg" }, { "idMeal": "52823", "strMeal": "Salmon Prawn Risotto", "strMealThumb": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg" }, { "idMeal": "52936", "strMeal": "Saltfish and Ackee", "strMealThumb": "https://www.themealdb.com/images/media/meals/vytypy1511883765.jpg" }, { "idMeal": "52836", "strMeal": "Seafood fideuà", "strMealThumb": "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg" }, { "idMeal": "52953", "strMeal": "Shrimp Chow Fun", "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445434.jpg" }, { "idMeal": "53023", "strMeal": "Sledz w Oleju (Polish Herrings)", "strMealThumb": "https://www.themealdb.com/images/media/meals/7ttta31593350374.jpg" }, { "idMeal": "53040", "strMeal": "Spring onion and prawn empanadas", "strMealThumb": "https://www.themealdb.com/images/media/meals/1c5oso1614347493.jpg" }, { "idMeal": "53065", "strMeal": "Sushi", "strMealThumb": "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg" }, { "idMeal": "52882", "strMeal": "Three Fish Pie", "strMealThumb": "https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg" }, { "idMeal": "52975", "strMeal": "Tuna and Egg Briks", "strMealThumb": "https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg" }, { "idMeal": "52852", "strMeal": "Tuna Nicoise", "strMealThumb": "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg" }];


    let [dataitems, setdataitems] = useState([])
    let [loading, setloading] = useState(false)
    const fetchData = async () => {
        setloading(true)
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`).then((res) => {

            setdataitems(res.data.meals)
            setloading(false)
        }).catch((err) => {
            console.log(err, 'erro from receipe  files ')
            setloading(false)
        })
    }
    useEffect(() => {
        fetchData()
    }, [data])
    // console.log(dataitems, 'dataitems')
    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? (<ActivityIndicator size='large' color="orange" />) : (
                <MasonryList
                    data={dataitems}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity

                        onPress={()=>{
                            navigation.navigate('Detail',{id:item.idMeal})
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
                    }}
                />
            )}

        </View>
    )
}

export default Rendeing

const styles = StyleSheet.create({})