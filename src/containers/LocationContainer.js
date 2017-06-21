import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';

class LocationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -37.0220384,
                longitude: -81.6379239,
                latitudeDelta: 0.005,
                longitudeDelta: 0.001,
            },
        };
    }

    componentDidMount() {
        this.findMe();
    }

    findMe() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            this.setState({
                region: {
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.001,
                }
            });
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Ubicación</Title>
                    </Body>
                </Header>
                <Content >
                    <Button style={{
                        position: 'absolute', zIndex: 10, margin: 0,
                        elevation: 10, paddingBottom: 0, paddingLeft: 5,
                        paddingRight: 5, paddingTop: 0, left: 10, top: 10,
                    }} light onPress={() => this.findMe()} >
                        <Icon name='navigate' style={{ fontSize: 25 }} />
                    </Button>
                    <MapView style={{ height: 510, width: 360 }} showsUserLocation showsMyLocationButton={true} region={this.state.region} />
                </Content>
            </Container>
        );
    }
}

export default LocationContainer;