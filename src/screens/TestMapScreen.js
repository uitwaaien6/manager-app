import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps';

class TestMapScreen extends React.Component { 
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default TestMapScreen;