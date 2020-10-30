import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import AuthForm from '../components/AuthForm';
import { signinAction, errorAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';

class EmployeesScreen extends React.Component {

    componentDidMount() {


    }

    render() {
        return (
            <View>
                <Text> Employees Screen</Text>
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}


export default EmployeesScreen;