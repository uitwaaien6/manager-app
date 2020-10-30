import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AuthForm extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>

                <TextInput
                    placeholder="User Name"
                    value={this.state.userName}
                    onChangeText={(newText) => {
                        this.setState({ UserName: newText });
                    }}
                />

                <TextInput
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(newText) => {
                        this.setState({ email: newText });
                    }}
                />

                <TextInput
                    placeholder="Password..."
                    value={this.state.password}
                    onChangeText={(newText) => {
                        this.setState({ password: newText });
                    }}
                />

                <TextInput
                    placeholder="Confirm Password..."
                    value={this.state.passwordConfirm}
                    onChangeText={(newText) => {
                        this.setState({ passwordConfirm: newText });
                    }}
                />

                <Button
                    title={this.props.title}
                    onPress={() => {
                        const { userName, email, password, passwordConfirm } = this.state;
                        this.props.onSubmit({ userName, email, password, passwordConfirm });
                    }}
                />
            </View>
        );
    };
};

export default AuthForm;