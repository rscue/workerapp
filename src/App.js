import React, { Component } from 'react'
import { View } from 'react-native'
import { StyleProvider } from 'native-base'
import { Provider } from 'react-redux';
import store from './redux/createStore';

import getTheme from './theme/components'
import rscueColors from './theme/variables/rscueColors'

import RootContainer from './containers/RootContainer';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(rscueColors)} >
                    <RootContainer />
                </StyleProvider>
            </Provider>
        )
    }
}

export default App