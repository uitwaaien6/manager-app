import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AuthForm extends React.Component {

    state = {
        email: '',
        password: ''
    };

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>

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
    };
};

export default AuthForm;