import React from 'react';
import MapView from 'react-native-maps'
import { View, StyleSheet, Text } from 'react-native';

import rscueColors from '../theme/variables/rscueColors';

const SIZE = 10;
const HALO_RADIUS = 2;
const ARROW_SIZE = 5;
const ARROW_DISTANCE = 4;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;
const colorOfmyLocationMapMarker = rscueColors.btnPrimaryBg;

const CurrentLocation = props => {
    const { heading } = props.coordinate;
    const rotate = (typeof heading === 'number' && heading >= 0) ? `${heading}deg` : null;
    return (
        <MapView.Marker.Animated
            coordinate={props.coordinate}
            title={props.title}
            description={props.description}
        >
            <View style={styles.container}>
                <View style={styles.markerHalo} />
                {rotate &&
                    <View style={[styles.heading, { transform: [{ rotate }] }]}>
                        <View style={styles.headingPointer} />
                    </View>
                }
                <View style={styles.marker}>
                    <Text style={{ width: 0, height: 0 }}>
                        {rotate}
                    </Text>
                </View>
            </View>
        </MapView.Marker.Animated>
    );
};

const styles = StyleSheet.create({
    mapMarker: {
        zIndex: 1000,
    },
    // The container is necessary to protect the markerHalo shadow from clipping
    container: {
        width: HEADING_BOX_SIZE,
        height: HEADING_BOX_SIZE,
    },
    heading: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: HEADING_BOX_SIZE,
        height: HEADING_BOX_SIZE,
        alignItems: 'center',
    },
    headingPointer: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: ARROW_SIZE * 0.75,
        borderBottomWidth: ARROW_SIZE,
        borderLeftWidth: ARROW_SIZE * 0.75,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colorOfmyLocationMapMarker,
        borderLeftColor: 'transparent',
    },
    markerHalo: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        width: HALO_SIZE,
        height: HALO_SIZE,
        borderRadius: Math.ceil(HALO_SIZE / 2),
        margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    marker: {
        justifyContent: 'center',
        backgroundColor: colorOfmyLocationMapMarker,
        width: SIZE,
        height: SIZE,
        borderRadius: Math.ceil(SIZE / 2),
        margin: (HEADING_BOX_SIZE - SIZE) / 2,
    },
});

export default CurrentLocation;