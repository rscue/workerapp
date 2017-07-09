import React, { Component } from 'react';
import { Container } from 'native-base';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Navigator from '../navigation';

class RootContainer extends Component {
    render() {
        const Router = Navigator(this.props.loggedIn);
        return (
            <Container >
                <StatusBar barStyle='light-content' />
                <Router />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.auth.accessToken && state.profile.lastName,
});

export default connect(mapStateToProps)(RootContainer);
