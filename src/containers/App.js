import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Container, StyleProvider, View, Text } from 'native-base'

import getTheme from '../theme/components'
import rscueColors from '../theme/variables/rscueColors'

class App extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(rscueColors)} >
                <Container>
                    <StatusBar barStyle='light-content' />
                    <View >
                        <Text >
                            Welcome to React Native!
        </Text>
                        <Text >
                            To get started, edit index.android.js
        </Text>
                        <Text >
                            Double tap R on your keyboard to reload,{'\n'}
                            Shake or press menu button for dev menu
        </Text>
                    </View>
                </Container>
            </StyleProvider>
        )
    }
}

export default App