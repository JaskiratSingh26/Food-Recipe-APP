

// import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Animated } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import logo from '../assets/logo.png'

// import { useNavigation } from '@react-navigation/native';

// const WelcomeScreen = () => {

//     const naviagtion = useNavigation()
//     const [scale, setScale] = useState(new Animated.Value(0.5))

//     useEffect(() => {
//         Animated.timing(scale, {
//             toValue: 2,
//             duration: 3000,
//             useNativeDriver: true
//         }).start()
        

//         setTimeout(()=>{
// naviagtion.navigate("Home")
//         },3500)


//     }, [])

//     return (
//         <SafeAreaView

//             style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#f09f23'
//             }}

//         >

//             <StatusBar

//                 style='light'
//             />


//             <Animated.Image
//                 style={{
//                     width: 280,
//                     height: 270,
//                     transform: [{ scale }]
//                 }}

//                 source={logo}
//             />


//             <Text

//                 style={{
//                     color: 'white',
//                     fontFamily: 'serif',
//                     fontSize: 35,
//                     fontWeight: 900,
//                     fontStyle: 'italic'
//                 }}


//             >
//                 Foody
//             </Text>

//             <Text

// style={{
//     color:'white',
//     fontFamily:'mono',
//     fontWeight:700,
//     marginTop:'3%',
//     fontSize:18,
//     fontStyle:'italic'
// }}
//             >
//                 Find Your favourite Food Recipe
//             </Text>


//         </SafeAreaView>
//     )
// }

// export default WelcomeScreen

// const styles = StyleSheet.create({})


import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation()
    const [scale, setScale] = useState(new Animated.Value(0.5))
    const [textScale, setTextScale] = useState(new Animated.Value(1))

    useEffect(() => {
        Animated.timing(scale, {
            toValue: 2,
            duration: 3000,
            useNativeDriver: true
        }).start()

        Animated.timing(textScale, {
            toValue: 2,
            duration: 3000,
            useNativeDriver: true,
            marginTop:'15%'
        }).start()

        setTimeout(() => {
            navigation.navigate("Home")
        }, 3500)
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f09f23'
            }}
        >
            <StatusBar
                style='light'
            />

            <Animated.Image
                style={{
                    width: 280,
                    height: 270,
                    transform: [{ scale }]
                }}
                source={logo}
            />

            <Animated.Text
                style={{
                    color: 'white',
                    fontFamily: 'serif',
                    fontSize: 35,
                    fontWeight: 900,
                    fontStyle: 'italic',
                    transform: [{ scale: textScale }]
                }}
            >
                Foody
            </Animated.Text>

            <Animated.Text
                style={{
                    color: 'white',
                    fontFamily: 'mono',
                    fontWeight: 700,
                    marginTop: '3%',
                    fontSize: 18,
                    fontStyle: 'italic',
                    
                }}
            >
                Find Your favourite Food Recipe
            </Animated.Text>

        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({})