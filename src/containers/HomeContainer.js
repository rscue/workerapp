import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Container, Header, Body, Content, Title, Text, Left, Right, Icon,
    Switch, ListItem, Grid, Row, Col, Card, CardItem, H2, List, Button, Separator
} from 'native-base';

class HomeContainer extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Inicio</Title>
                    </Body>
                </Header>
                <Content>
                    <ListItem last>
                        <Body style={{ alignItems: 'center', marginTop: 20 }}>
                            <H2>Juan Perez</H2>
                        </Body>
                    </ListItem>
                    <ListItem last style={{ height: 300 }}>
                        <Body style={{ alignItems: 'center' }}>
                            <Image style={{ resizeMode: 'cover', width: 250, height: 250, borderRadius: 125 }} source={require('../assets/img/nobody.jpg')} />
                        </Body>
                    </ListItem>
                    <Separator bordered />
                    <ListItem button icon last>
                        <Left>
                            <Button style={{ backgroundColor: '#FF9501' }} >
                                <Icon active name="boat" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Cruise 350</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon last>
                        <Left>
                            <Button style={{ backgroundColor: '#FD3C2D' }} >
                                <Icon name="help-buoy" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>En servicio</Text>
                        </Body>
                        <Right>
                            <Switch />
                        </Right>
                    </ListItem>
                </Content >
            </Container >
        )
    }
}

export default HomeContainer;