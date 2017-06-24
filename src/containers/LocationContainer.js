import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Button, Icon, Toast } from 'native-base';
import MapView from 'react-native-maps';

import CurrentLocationMarker from '../components/CurrentLocationMarker';

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
            workerLocation: {
                latitude: -37.0220384,
                longitude: -81.6379239,
            },
            enableHack: true,
        };
    }

    componentDidMount() {
        this.trackWorkerLocation();
        this.findMe();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    trackWorkerLocation() {
        this.watchID = navigator.geolocation.watchPosition(
            ({ coords }) => {
                const { latitude, longitude, heading } = coords;
                this.setState({
                    workerLocation: {
                        latitude,
                        longitude,
                        heading
                    },
                    workerLocationTitle: `Lat: ${this.state.workerLocation.latitude} Lng: ${this.state.workerLocation.longitude}`
                });
            },
            (error) => {
                if (error.code === error.TIMEOUT) {
                    Toast.show({
                        buttonText: 'Cerrar',
                        position: 'bottom',
                        type: 'warning',
                        text: 'Hubo un error al detectar su ubicación, asegurese que tenga el GPS activado'
                    });
                } else {
                    alert(error.message);
                }
            },
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 10000 }
        );
    }

    findMe() {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude, heading } = coords;
                const region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.001,
                };
                this.setState({
                    workerLocation: {
                        latitude,
                        longitude,
                        heading
                    },
                    workerLocationTitle: `Lat: ${this.state.workerLocation.latitude} Lng: ${this.state.workerLocation.longitude}`
                });
                this.map.animateToRegion(region);
            },
            (error) => {
                if (error.code === error.TIMEOUT) {
                    Toast.show({
                        buttonText: 'Cerrar',
                        position: 'bottom',
                        type: 'warning',
                        text: 'Hubo un error al detectar su ubicación, asegurese que tenga el GPS activado'
                    });
                } else {
                    alert(error.message);
                }
            });
    }

    render() {
        const { heading } = this.state.workerLocation;
        const rotate = (typeof heading === 'number' && heading >= 0) ? `${heading}deg` : null;
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
                    <MapView
                        style={{ height: 510, width: 360 }}
                        ref={ref => { this.map = ref; }}
                        onRegionChange={region => this.setState({ region })}
                    >
                        <CurrentLocationMarker
                            coordinate={this.state.workerLocation}
                            title="Ubicación actual"
                            description={this.state.workerLocationTitle}
                        />
                    </MapView>
                </Content>
            </Container>
        );
    }
}

export default LocationContainer;