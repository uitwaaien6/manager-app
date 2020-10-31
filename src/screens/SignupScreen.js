import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signupAction, errorAction, loadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

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
                console.log(token, expiration);
                dispatch(signupAction({ token, expiration }));
            } catch (error) {
                console.log(error);
                dispatch(errorAction('Invalid email address !'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);