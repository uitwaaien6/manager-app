import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AuthForm extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    initializeForm() {
        switch (this.props.title) {
            case "Signup":
            case "Register":
                return (
                    <View>
                        <TextInput
                            placeholder="User Name"
                            value={this.state.userName}
                            
                            onChangeText={(newText) => {
                                this.setState({ userName: newText });
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
            case 'Signin':
            case 'Login':
                return (
                    <View>
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

                        <Button
                            title={this.props.title}
                            onPress={() => {
                                const { email, password } = this.state;
                                this.props.onSubmit({ email, password });
                            }}
                        />
                    </View>
                );
            default:
                console.log('AuthForm args is not valid to display the form');
                return null;
        };
    };

    componentDidMount() {

    }

    render() {
        return (
            this.initializeForm()
        );
    };
};

export default AuthForm;