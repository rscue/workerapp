import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { addNavigationHelpers, Transitioner } from 'react-navigation';
import { Easing, Animated, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sceneStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
});

const CustomTabBar = ({ navigation, router }) => {
    const { routes, index } = navigation.state;
    return (
        <Footer>
            {routes.map(route => {
                const screenNavigation = addNavigationHelpers({ state: route });
                const options = router.getScreenOptions(screenNavigation, {});
                return (
                    <FooterTab key={route.routeName}>
                        <Button onPress={() => navigation.navigate(route.routeName)} active={routes[index].routeName === route.routeName}>
                            <Icon name={options.icon} />
                            <Text>{options.title}</Text>
                        </Button>
                    </FooterTab>
                );
            })}
        </Footer>
    );
};


class NavigationTab extends Component {
    _configureTransition = (transitionProps, prevTransitionProps) => {
        return {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
        }
    };

    _renderScene = (transitionProps, scene) => {
        const { position } = transitionProps;
        const { index } = scene;
        const opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
        });
        // The prop `router` is populated when we call `createNavigator`.
        const Scene = this.props.router.getComponentForRouteName(scene.route.routeName);
        return (
            <Animated.View style={[styles.sceneStyle, { opacity }]} key={scene.key} >
                <Scene navigation={this.props.navigation} />
            </Animated.View>
        )
    };

    _render = (transitionProps, prevTransitionProps) => {
        const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene));
        return (
            <View style={{ flex: 1 }}>
                {scenes}
            </View>
        );
    };

    render() {
        return (
            <Container>
                <Transitioner
                    configureTransition={this._configureTransition}
                    navigation={this.props.navigation}
                    render={this._render}
                />
                <CustomTabBar navigation={this.props.navigation} router={this.props.router} />
            </Container>
        );
    }
}

export default NavigationTab;