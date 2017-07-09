import React, { Component } from 'react';
import { Container } from 'native-base';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Navigator from '../navigation';
import StartupActions from '../redux/StartupRedux';

class RootContainer extends Component {
    componentDidMount() {
        this.props.startup();
    }

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

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);