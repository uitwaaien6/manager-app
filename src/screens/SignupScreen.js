import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signupAction, errorAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';

class SignupScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View>

                <AuthForm
                    title="Signup"
                    onSubmit={this.props.signup}
                />

                <Button
                    title="Go to Sign in"
                    onPress={() => {
                        this.props.navigation.navigate('Signin');
                    }}
                />
                {this.props.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                {this.props.msg ? <Text>{this.props.msg}</Text> : null}
                {this.props.error ? <Text>{this.props.error}</Text> : null}
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        error: state.auth.error,
        loading: state.auth.loading,
        msg: state.auth.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup: async ({ email, password }) => {
            try {
                dispatch({ type: 'LOADING', payload: true });
                const encryptenData = encryptPassword(password);
                const response = await managerApi.post('/signup', { email, ...encryptenData });
                const { token } = response.data;
                await AsyncStorage.setItem('token', token);
                console.log({ token: token });
                dispatch(signupAction(token));
            } catch (error) {
                dispatch(errorAction('Invalid email address !'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);