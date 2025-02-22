import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Screens/Profile';
import WelcomeScreen from './Screens/WelcomeScreen';
import Rendeing from './Screens/Rendeing';
import Detail from './Screens/Detail';
import Serach from './Screens/Serach';
import Favitem from './Screens/Favitem';


const StackNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>


            <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
            initialRouteName='Welcome'
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Serach" component={Serach} />
                <Stack.Screen name="Favitem" component={Favitem} />
                <Stack.Screen name="Rendeing" component={Rendeing}   options={{
                    headerShown:true
                }} />
                {/* <Stack.Screen name ="Waste"   component={Waste} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})