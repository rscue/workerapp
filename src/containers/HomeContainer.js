import React, { Component } from 'react';
import { Image, TouchableNativeFeedback } from 'react-native';
import {
    Container, Header, Body, Content, Title, Text, Left, Right, Icon,
    Switch, ListItem, Grid, Row, Col, Card, CardItem, H2, List, Button, Separator,
    ActionSheet
} from 'native-base';
import { connect } from 'react-redux';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onService: false,
            boatTow: 'No embarcado',
        };
    }

    boatTowSelect = () => {
        const options = [
            'Embarcación 1',
            'Embarcación 2',
            'Cancelar',
        ];
        const cancelButtonIndex = options.length - 1;
        ActionSheet.show({
            options,
            cancelButtonIndex,
            title: 'Seleccione la embarcación a usar',
        }, index => {
            switch (parseInt(index)) {
                case cancelButtonIndex:
                    this.setState({ onService: false, boatTow: 'No embarcado' });
                    break;
                default:
                    this.setState({ onService: true, boatTow: options[index] });
            }
        });

    }

    switchService = () => {
        if (this.state.onService) {
            this.setState({ onService: false });
        } else {
            this.boatTowSelect();
        }
    }

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
                            <H2>{this.props.name} {this.props.lastName}</H2>
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
                            <Text>{this.state.boatTow}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon last onPress={() => this.boatTowSelect()}>
                        <Left>
                            <Button style={{ backgroundColor: '#FD3C2D' }} >
                                <Icon name="help-buoy" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>En servicio</Text>
                        </Body>
                        <Right>
                            <Switch value={this.state.onService} onValueChange={() => this.switchService()} />
                        </Right>
                    </ListItem>
                </Content >
            </Container >
        )
    }
}

const mapStateToProps = (state) => ({
    name: state.profile.name,
    lastName: state.profile.lastName,
});

export default connect(mapStateToProps)(HomeContainer);