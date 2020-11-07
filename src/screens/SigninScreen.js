import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { authSigninAction, authErrorAction, authLoadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class SigninScreen extends React.Component {

    displayInfo() {
        if (this.props.loading) {
            return (
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff"
                />
            );
        }
        if (this.props.msg) {
            return (
                <Text style={styles.message}>{this.props.msg}</Text>
            );
        }
        if (this.props.error) {
            return (
                <View>
                    <Text style={styles.message}>{this.props.error}</Text>
                    {
                        this.props.error === 'Please Verify Your email'
                        ? <Button
                            title="Resend verification Link"
                            onPress={this.props.resendLink}
                        /> 
                        : null
                    }
                </View>
            );
        }
        return null;
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <AuthForm
                    title="Signin"
                    onSubmit={this.props.signin}
                />

                {this.displayInfo()}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {

    },
    message: {
        color: 'red',
        textAlign: 'center',
        padding: 20,
        fontSize: 22,
        fontWeight: 'bold'
    }
})

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
                dispatch(authLoadingAction(false));
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Error while resending email verification link'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
