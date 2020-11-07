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
            return <ActivityIndicator size="large" color="#0000ff" />;
        }
        if (this.props.msg) {
            return <Text>{this.props.msg}</Text>;
        }
        if (this.error) {
            return <Text>{this.props.error}</Text>;
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
        backgroundColor: 'purple',
        height: '100%'
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
                const response = await managerApi.post('/signin', { email: email.toLowerCase(), passwordEncryption });
                const { token, jwtExpiration, status } = response.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('jwtExpiration', jwtExpiration.toString());
                await AsyncStorage.setItem('status', status);
                dispatch(authSigninAction({ token, jwtExpiration: jwtExpiration.toString(), status }));
                navigate('EmailVerification');
            } catch (error) {
                const message = 'Something went wrong while signing in';
                dispatch(authErrorAction(message));
            }
            navigate('EmailVerification');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
