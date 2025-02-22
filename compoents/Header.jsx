import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import fast from '../assets/fast.png'
import fav from '../assets/fav.png'
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView } from 'react-native';
const Header = () => {
    let navigation = useNavigation()
    let [data, setdata] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // Add your refreshing logic here
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      };
    return (
        <SafeAreaView

            style={{
                padding: '2%',
                backgroundColor: 'white',
                padding: '2%'
            }}
        >
            <KeyboardAvoidingView>
<ScrollView



refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }>




                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >


                    <Image

                        source={fast}
                        style={{
                            width: 55,
                            height: 55
                        }}
                    />

                    <TouchableOpacity  onPress={()=>{
                        navigation.navigate('Favitem')
                        
                    }}>

                        <Image


                            source={fav}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />

                    </TouchableOpacity>
                </View>


                <View
                    style={{
                        gap: 8,
                        marginTop: '5%',
                        padding: '2%'
                    }}
                >

{/* 
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'serif',
                        fontWeight: 800,
                        fontStyle: 'italic',

                    }} >Hello ,user</Text> */}
                    <Text

                        style={{
                            fontSize: 22,
                            fontFamily: 'serif',
                            fontWeight: 900,
                            fontStyle: 'italic',

                        }}
                    >Make Your Own Food, </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: 'serif',
                            fontWeight: 800,
                            fontStyle: 'italic',

                        }}
                    >Stay at   <Text

                        style={{
                            color: 'orange'
                        }}>
                            home
                        </Text>
                    </Text>

                </View>


                <View
                    style={{
                        borderColor: 'grey',
                        borderWidth: 1,
                        borderRadius: 25,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '2%',
                        marginTop: '4%'
                    }}
                >
                    <TextInput
                        style={{

                            width: '80%'
                        }}

                        placeholder='Serach any recipe....'
                        value={data}
                        onChangeText={(txt) => { setdata(txt) }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Serach', { data })
                            setdata('')
                        }}
                        style={{
                            backgroundColor: 'grey',
                            padding: '3%',
                            borderRadius: 50
                        }}
                    >

                        <Fontisto name="zoom" size={22} color="orange" />
                    </TouchableOpacity>

                </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({})