import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, Linking } from 'react-native';
import AuthForm from '../components/AuthForm';
import { authSignupAction, authErrorAction, authLoadingAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import DisplayPageInfo from '../components/DisplayPageInfo';
import checkIfUserActive from '../check-user/checkIfUserActive';

class SignupScreen extends React.Component {

    componentDidMount() {
        checkIfUserActive();
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
        signup: async ({ userName, email, password, passwordConfirm }) => {
            try {
                dispatch(authLoadingAction(true));
                const passwordEncryption = encryptPassword(password);
                const passwordConfirmEncryption = encryptPassword(passwordConfirm)
                const response = await managerApi.post('/signup', { userName, email, passwordEncryption, passwordConfirmEncryption });
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('jwtExpiration');
                const { status } = response.data;
                const verificationMsg = `We have sent a verification link to your email pleace check, it is ${status}` ;
                dispatch(authSignupAction({ verificationMsg }));
            } catch (error) {
                console.log(error);
                dispatch(authErrorAction('Something went wrong in signup, please make sure your email addres and password is valid!'));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);