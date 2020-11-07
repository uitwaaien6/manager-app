import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import AuthForm from '../components/AuthForm';
import { authSignupAction, authErrorAction, authLoadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class SignupScreen extends React.Component {

    async checkIfUserAuthenticated() {
        try {
            const token = await AsyncStorage.getItem('token');
            const exp = await AsyncStorage.getItem('expiration');
    
            if (token && exp) {
                if (Date.now() > exp) {
                    navigate('AuthFlow');
                } else {
                    navigate('MainFlow');
                }
            } else {
                navigate('AuthFlow');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    displayInfo() {
        if (this.props.loading) return <ActivityIndicator size="large" color="#0000ff" />;
        if (this.props.msg) return <Text>{this.props.msg}</Text>;
        if (this.props.error) return <Text>{this.props.error}</Text>;
        return null;
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

                {this.displayInfo()}
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
        signup: async ({ userName, email, password, passwordConfirm }) => {
            try {
                dispatch(authLoadingAction(true));
                const passwordEncryption = encryptPassword(password);
                const passwordConfirmEncryption = encryptPassword(passwordConfirm)
                const response = await managerApi.post('/signup', { userName, email, passwordEncryption, passwordConfirmEncryption });
                const { status } = response.data;
                console.log(status);
                const verificationMsg = `We have sent a verification link to your email pleace check, it is ${status}` ;
                dispatch(authSignupAction({ verificationMsg }));
                
            } catch (error) {
                console.log(error);
                dispatch(authErrorAction('Invalid email address !'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);