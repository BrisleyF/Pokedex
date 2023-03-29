import React from "react";
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AccountScreen from "../screens/Account";
import PokedexNavigation from "./PokedexNavigation";
import FavoriteNavigation from './FavoriteNavigation';
import FovoriteScreen from '../screens/Favorite';


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator initialRouteName="Pokedex">
            <Tab.Screen name="Fovorite" component={FavoriteNavigation} 
            options={{
                tabBarLabel: 'Favoritos',
                headerTitleAlign: 'center',
                title: "Favoritos",
                tabBarIcon: ({color, size}) => ( <Icon name="heart" color={color} size={size}/> ) }}/>
            
            <Tab.Screen name="Pokedex" component={PokedexNavigation} options={{
                tabBarLabel: '',
                title: '',
                headerStyle: {height: 25},
                tabBarIcon: () => renderPokerBall(),
            }}/>
            
            <Tab.Screen name="Account" component={AccountScreen} 
            options={{
                tabBarLabel: 'Mi cuenta',
                headerTitleAlign: 'center',
                title: "Mi cuenta",
                tabBarIcon: ({color, size}) => ( <Icon name="user" color={color} size={size}/> )
            }}/>
        </Tab.Navigator>
    )
}

function renderPokerBall() {
    return (
        <Image 
            source={require('../assets/pokeball.png')}
            style={{ width: 60, height: 60, top: -15}}
        />
    )
}