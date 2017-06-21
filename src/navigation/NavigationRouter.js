import React, { Component } from 'react';
import { TabRouter } from 'react-navigation';

import HomeContainer from '../containers/HomeContainer';
import LocationContainer from '../containers/LocationContainer';

const NavigationRouter = TabRouter(
    {
        Home: {
            screen: HomeContainer,
            path: 'home',
            navigationOptions: {
                title: 'Inicio',
                icon: 'home',
            },
        },
        Location: {
            screen: LocationContainer,
            path: 'location',
            navigationOptions: {
                title: 'Ubicación',
                icon: 'map',
            },
        },
    },
    {
        initialRouteName: 'Home',
    }
);

export default NavigationRouter;