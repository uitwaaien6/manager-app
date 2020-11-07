import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import { authErrorAction, authLoadingAction, authUpdateStatusAction } from '../actions/authActions';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class EmailVerificationScreen extends React.Component {

    displayInfo() {
        return null;
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text>EmailVerificationScreen</Text>

                <Button
                    title="Resend Verification Link"
                    onPress={this.props.resendLink()}
                />

                <Button
                    title="Reload"
                    onPress={this.props.checkStatus()}
                />

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'purple',
        height: '100%'
    }
})

function mapStateToProps(state) {
    return {
        currentUser: state.authReducer.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resendLink: async () => {
            try {
                dispatch(authLoadingAction(true));
                await managerApi.get('/api/auth/verification/verify-account/resend-link');
                dispatch(authLoadingAction(false));
            } catch (error) {
                console.log(error.message);
                dispatch(authErrorAction('Error while resending email verification link'));
            }
        },
        checkStatus: async () => {
            try {
                const status = await AsyncStorage.getItem('status');
                if (status === 'active') {
                    navigate('MainFlow');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationScreen);
