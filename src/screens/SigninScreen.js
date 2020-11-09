import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';
import AuthForm from '../components/AuthForm';
import DisplayPageInfo from '../components/DisplayPageInfo';
import { connect } from 'react-redux';
import managerApi from '../api/managerApi';
import { navigate } from '../navigation/navigationRef';
import { encryptPassword } from '../encryption/coefficientFairEncryption';
import checkIfUserActive from '../check-user/checkIfUserActive';
import { authSigninAction, authErrorAction, authLoadingAction } from '../actions/authActions';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

class SigninScreen extends React.Component {

    state = {
        showForm: false
    }

    componentDidMount() {
        checkIfUserActive();
    }

    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    title="Signin"
                    onSubmit={this.props.signin}
                />

                <Button
                    title="Forgot your password?"
                    onPress={() => {
                        this.setState({ showForm: !this.state.showForm });
                    }}
                />

                <ForgotPasswordForm
                    showForm={this.state.showForm}
                    onPasswordResetCodeSend={this.props.sendPasswordResetCode}
                />

                <DisplayPageInfo
                    info={this.props}
                />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {

    }
});

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
                const signinResponse = await managerApi.post('/signin', { email: email.toLowerCase(), passwordEncryption });
                const { token, jwtExpiration } = signinResponse.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('jwtExpiration', jwtExpiration.toString());
                dispatch(authSigninAction({ token, jwtExpiration: jwtExpiration.toString() }));
                await managerApi.get('/api/auth/verification/verify-account/check-user-status');
                navigate('MainFlow');
            } catch (error) {
                let message = '';
                if (error.message === 'Request failed with status code 401') {  message = 'Please Verify Your email'; } 
                else { message = 'Something went wrong in Signin!'; }
                dispatch(authErrorAction(message));
            }
        },
        resendLink: async () => {
            try {
                dispatch(authLoadingAction(true));
                await managerApi.get('/api/auth/verification/verify-account/resend-link');
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('expiration');
                dispatch(authLoadingAction(false));
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Error while resending email verification link'));
            }
        },
        sendPasswordResetCode: async ({ email }) => {
            try {
                dispatch(authLoadingAction(true));
                await managerApi.post('/api/auth/verification/password-reset/generate-code', { email });
                dispatch(authLoadingAction(false));
                navigate('PasswordResetCode', { email });
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Something occured while sending password reset link'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
