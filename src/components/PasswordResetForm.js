import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class PasswordResetForm extends React.Component {

    state = {
        email: this.props.email,
        newPassword: '',
        newPasswordConfirm: ''
    }

    render() {
        return (
            <View>
                <Text>Reset Your Password</Text>

                <TextInput
                    value={this.state.newPassword}
                    onChangeText={(newText) => {
                        this.setState({ newPassword: newText });
                    }}
                />

                <TextInput
                    value={this.state.newPasswordConfirm}
                    onChangeText={(newText) => {
                        this.setState({ newPasswordConfirm: newText });
                    }}
                />

                <Button
                    title="Change Password"
                    onPress={() => {
                        const { email, newPassword, newPasswordConfirm } = this.state;
                        this.props.onChangePassword({ email, newPassword, newPasswordConfirm });
                    }}
                />
            </View>
        );
    }
}

export default PasswordResetForm;