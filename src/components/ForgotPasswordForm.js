import React from 'react';
import { Text, StyleSheet, TextInput, View, Button } from 'react-native';
import { navigate } from '../navigation/navigationRef';

class ForgotPasswordForm extends React.Component {

    state = {
        email: ''
    }

    render() {
        if (this.props.showForm) {
            return (
                <View>
                    <Text>Please Enter Your Email</Text>

                    <TextInput
                        value={this.state.email}
                        onChangeText={(newText) => {
                            this.setState({ email: newText });
                        }}
                    />

                    <Button
                        title="Request Reset Code"
                        onPress={async () => {
                            const { email } = this.state;
                            await this.props.onPasswordResetCodeSend({ email });
                        }}
                    />
                </View>
            );
        }
        return null;
    };
}

export default ForgotPasswordForm;