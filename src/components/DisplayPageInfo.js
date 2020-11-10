import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';

class DisplayPageInfo extends React.Component {

    render() {
        if (this.props.info.loading) {
            return (
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff"
                />
            );
        }

        if (this.props.info.msg) {
            return (
                <Text style={styles.message}>{this.props.info.msg}</Text>
            );
        }
        
        if (this.props.info.error) {
            return (
                <View>
                    <Text style={styles.message}>{this.props.info.error}</Text>
                    {
                        this.props.info.error === 'Please Verify Your email'
                        ? <Button
                            title="Resend verification Link"
                            onPress={this.props.info.resendLink}
                        /> 
                        : null
                    }
                </View>
            );
        } else {
            
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {

    },
    message: {
        color: 'red',
        textAlign: 'center',
        padding: 20,
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default DisplayPageInfo;