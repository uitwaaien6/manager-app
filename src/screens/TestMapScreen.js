import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

class TestMapScreen extends React.Component { 
    render() {
        return (
            <View style={styles.container}>
                <Text></Text>
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