import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { Container, StyleProvider } from 'native-base'

import getTheme from './theme/components'
import rscueColors from './theme/variables/rscueColors'

import Router from './navigation';

class App extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(rscueColors)} >
                <Container >
                    <StatusBar barStyle='light-content' />
                    <Router />
                </Container>
            </StyleProvider>
        )
    }
}

export default App