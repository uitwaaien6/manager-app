import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { authSigninAction, authErrorAction, authLoadingAction } from '../actions/authActions';
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
                {this.props.error ? <Text>{this.props.error}</Text> : null}
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        currentUser: state.authReducer.currentUser,
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        msg: state.authReducer.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signin: async ({ email, password }) => {
            try {
                dispatch(authLoadingAction(true));
                const passwordEncryption = encryptPassword(password);
                const response = await managerApi.post('/signin', { email, passwordEncryption });
                const { token, expiration } = response.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('expiration', expiration.toString());
                dispatch(authSigninAction({ token, expiration: expiration.toString() }));
                navigate('MainFlow');
            } catch (error) {
                const message = 'Something went wrong while signing in';
                dispatch(authErrorAction(message));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
