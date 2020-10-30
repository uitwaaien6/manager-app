import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signinAction, errorAction, loadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class SigninScreen extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <AuthForm
                    title="Signin"
                    onSubmit={this.props.signin}
                />
                {this.props.loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        error: state.auth.error,
        loading: state.auth.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signin: async ({ userName, email, password, passwordConfirm }) => {
            try {
                dispatch(loadingAction(true));
                const passwordEncryption = encryptPassword(password);
                const passwordConfirmEncryption = encryptPassword(passwordConfirm);
                const response = await managerApi.post('/signin', { userName, email, passwordEncryption, passwordConfirmEncryption });
                const { token, expiration } = response.data;
                await AsyncStorage.setItem('token', token);
                dispatch(signinAction({ token, expiration }));
                navigate('MainFlow');
            } catch (error) {
                const message = 'Something went wrong while signing in';
                dispatch(errorAction(message));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
