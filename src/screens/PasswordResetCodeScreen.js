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

class PasswordResetCodeScreen extends React.Component {

    state = {
        email: this.props.navigation.getParam('email'),
        passwordResetCode: null
    }

    render() {
        return (
            <View>
                <Text> Please Enter Your Password Reset Code</Text>

                <TextInput
                    value={this.state.passwordResetCode}
                    onChangeText={(newText) => {
                        this.setState({ passwordResetCode: newText });
                    }}
                />

                <Button
                    title="Submit Password Reset Code"
                    onPress={() => {
                        const { email, passwordResetCode } = this.state;
                        this.props.verifyPasswordResetCode({ email, passwordResetCode });
                    }}
                />

                <DisplayPageInfo
                    info={this.props}
                />
            </View>
        );
    }

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
        verifyPasswordResetCode: async ({ email, passwordResetCode }) => {
            try {
                dispatch(authLoadingAction(true));
                // encrypt passwordResetCode before sending to the server
                const response = await managerApi.post('/api/auth/verification/password-reset/verify-code', { email, passwordResetCode });
                dispatch(authLoadingAction(false));
                const { success } = response.data;
                if (success) {
                    navigate('PasswordReset', { email });
                }
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Something went wrong while verifing password reset code'));
            }
        }   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetCodeScreen);
