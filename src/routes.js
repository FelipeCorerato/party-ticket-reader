import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './pages/Home';
import Camera from './pages/Camera';

import TabBar from './components/TabBar';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name='home-outline' color={tintColor} size={25} /> 
            }
        },
        Camera: {
            screen: Camera,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name='camera-outline' color={tintColor} size={25} />
            }
        }
    },
    {
        tabBarComponent: TabBar,
        tabBarOptions: {
            activeTintColor: 'rgba(75, 61, 161, 0.8)',
            inactiveTintColor: '#ddd'
        }
    }
)

export default createAppContainer(TabNavigator);