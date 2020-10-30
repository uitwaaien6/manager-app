import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signinAction, errorAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class EmployeesScreen extends React.Component {

    componentDidMount() {


    }

    render() {
        return (
            <View>
                <Text> Employees Screen</Text>
                <Button
                    title="Sign out"
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        this.props.signout();
                    }}
                />
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        token: state.auth.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signout: () => {
            dispatch({ type: 'SIGNOUT' });
            navigate('AuthFlow');
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);