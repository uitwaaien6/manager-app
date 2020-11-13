import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';
import AuthForm from '../components/AuthForm';
import DisplayPageInfo from '../components/DisplayPageInfo';
import { connect } from 'react-redux';
import managerApi from '../api/managerApi';
import { navigate } from '../navigation/navigationRef';
import { encryptPassword } from '../encryption/coefficientFairEncryption';
import checkIfUserActive from '../check-user/checkIfUserActive';
import { authSigninAction, authErrorAction, authLoadingAction, authMessageAction } from '../actions/authActions';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import PasswordResetForm from '../components/PasswordResetForm';

class PasswordResetScreen extends React.Component {

    state = {
        email: this.props.navigation.getParam('email'),
        passwordResetCode: this.props.navigation.getParam('passwordResetCode')
    }

    render() {
        return (
            <View>
                <PasswordResetForm
                    email={this.state.email}
                    passwordResetCode={this.state.passwordResetCode}
                    onChangePassword={this.props.changePassword}
                />

                <Button
                    title="Go to Signin"
                    onPress={() => navigate('Signin')}
                />

                <DisplayPageInfo
                    info={this.props}
                />
            </View>
        );
    }
}

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
        changePassword: async ({ email, newPassword, newPasswordConfirm, passwordResetCode }) => {
            try {
                dispatch(authLoadingAction(true));
                const newPasswordEncryption = encryptPassword(newPassword);
                const newPasswordConfirmEncryption = encryptPassword(newPasswordConfirm);
                await managerApi.post('/api/auth/verification/password-reset/reset-password', { email: email.toLowerCase(), newPasswordEncryption, newPasswordConfirmEncryption, passwordResetCode });
                dispatch(authLoadingAction(false));
                dispatch(authMessageAction('Password Changed Successfully'));
                navigate('Signin');
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Something went wrong in changing password'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetScreen);