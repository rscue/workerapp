import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { addNavigationHelpers } from 'react-navigation';

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

const NavigationTab = ({ router, navigation }) => {
    const { routes, index } = navigation.state;
    const ActiveScreen = router.getComponentForState(navigation.state);
    return (
        <Container>
            <ActiveScreen
                navigation={addNavigationHelpers({
                    ...navigation,
                    state: routes[index],
                })}
            />
            <CustomTabBar navigation={navigation} router={router} />
        </Container>
    );
};

export default NavigationTab;