import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import MasonryList from '@react-native-seoul/masonry-list';
const Favitem = () => {
  let navigation = useNavigation()

  let [dataitems, setdataitems] = useState([])
  let [loading, setloading] = useState(false)
  const retrieveData = async () => {
    setloading(true)
    try {
      const storedData = await AsyncStorage.getItem('favoriteMeals');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);

        setdataitems(parsedData)
      }
    } catch (error) {
      console.error(error);
    }
    setloading(false)
  };
  useEffect(() => {
    retrieveData()
  }, [])

  console.log(dataitems, 'fav items page ')
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

export default Favitem

const styles = StyleSheet.create({})