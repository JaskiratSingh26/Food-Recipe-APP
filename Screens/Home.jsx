import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../compoents/Header'
import Categories from '../compoents/Categories'
import Recipe from '../compoents/Recipe'
const Home = () => {
  let navigation = useNavigation()

  return (
    <ScrollView
      style={{
        backgroundColor: 'white'
      }}
    >
      <Header />
      <Categories />
       

       <Text
       style={{
        fontFamily:'serif',
        fontSize:26,
        padding:'3%',
        fontStyle:'italic',
        fontWeight:900,
       }}
       >
        Recipes
       </Text>
       <Recipe/>





    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})