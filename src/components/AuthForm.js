import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class AuthForm extends React.Component {

    state = {
        userName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    initializeForm() {
        switch (this.props.title) {
            case "Signup":
            case "Register":
                return (
                    <View style={styles.container}>

                        <View>
                            <Text>User Name: </Text>
                            <TextInput
                                placeholder="User Name"
                                value={this.state.userName}
                                
                                onChangeText={(newText) => {
                                    this.setState({ userName: newText });
                                }}
                            />
                        </View>


                        <View>
                            <Text>Email: </Text>
                            <TextInput
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={(newText) => {
                                    this.setState({ email: newText });
                                }}
                            />
                        </View>

                        <View>
                            <Text>Password: </Text>
                            <TextInput
                                placeholder="Password..."
                                value={this.state.password}
                                onChangeText={(newText) => {
                                    this.setState({ password: newText });
                                }}
                            />
                        </View>


                        <View>
                            <Text>Confirm Password: </Text>
                            <TextInput
                                placeholder="Confirm Password..."
                                value={this.state.passwordConfirm}
                                onChangeText={(newText) => {
                                    this.setState({ passwordConfirm: newText });
                                }}
                            />
                        </View>

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
                    <View style={styles.container}>

                        <View style={styles.section}>
                            <Text style={styles.label}>Email: </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={this.state.email}
                                onChangeText={(newText) => {
                                    this.setState({ email: newText });
                                }}
                            />
                        </View>


                        <View style={styles.section}>
                            <Text style={styles.label}>Password: </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Password..."
                                value={this.state.password}
                                onChangeText={(newText) => {
                                    this.setState({ password: newText });
                                }}
                            />
                        </View>

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
        return this.initializeForm();
    };
};

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {

    },
    input: {
        flex: 1,
        fontSize: 20
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default AuthForm;