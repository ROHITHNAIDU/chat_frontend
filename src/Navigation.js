import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator, HeaderTitle} from 'react-navigation-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Splash from './pages/Splash';


const AuthStackNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
},{headerMode: 'none'});

const AppStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title:'Chit Chat',

            headerStyle:{
                backgroundColor:'#ff751a',
                height:60,
            
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:28
            }

            
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            headerStyle:{
                backgroundColor:'#ff751a',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:25
            }
            
        },
    },
});

const SwitchNavigator = createSwitchNavigator({
        AuthLoading: AuthStackNavigator,
        App: AppStackNavigator
    },
    {
        initialRouteName: 'AuthLoading',
    });

const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;
