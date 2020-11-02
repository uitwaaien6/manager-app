import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signupAction, errorAction, loadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class SignupScreen extends React.Component {

    async checkIfUserAuthenticated() {
        const token = await AsyncStorage.getItem('token');
        const exp = await AsyncStorage.getItem('expiration');
        console.log(token, exp);
        if (token) {
            if (Date.now() > exp) {
                console.log('This users token has expired go fuck yourself');
                navigate('AuthFlow');
            } else {
                console.log('Current user has the token its okay');
                navigate('MainFlow');
            }
        } else {
            console.log('This users token is not event exist how did you even get here');
            navigate('AuthFlow');
        }
    }

    componentDidMount() {
        this.checkIfUserAuthenticated();
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
        currentUser: state.auth.currentUser,
        error: state.auth.error,
        loading: state.auth.loading,
        msg: state.auth.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup: async ({ userName, email, password, passwordConfirm }) => {
            try {
                dispatch(loadingAction(true));
                const passwordEncryption = encryptPassword(password);
                const passwordConfirmEncryption = encryptPassword(passwordConfirm)
                const response = await managerApi.post('/signup', { userName, email, passwordEncryption, passwordConfirmEncryption });
                const { token, expiration } = response.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('expiration', expiration.toString());
                dispatch(signupAction({ token, expiration: expiration.toString() }));
            } catch (error) {
                console.log(error);
                dispatch(errorAction('Invalid email address !'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);