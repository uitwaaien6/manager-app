import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { employeesErrorAction, employeesLoadingAction } from '../actions/employeesActions';
import CreateEmployeeForm from '../components/CreateEmployeeForm';

class CreateEmployeeScreen extends React.Component {

    state = {
        name: null,
        phone: null,
        shift: null
    }

    async checkIfUserAuthenticated() {
        const token = await AsyncStorage.getItem('token');
        const exp = await AsyncStorage.getItem('token');
        if (token && exp) {
            if (Date.now() > exp) { navigate('AuthFlow'); }
        } else {
            navigate('AuthFlow');
        }
    }

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
        this.checkIfUserAuthenticated();
    }

    render() {
        return (
            <View>
                <CreateEmployeeForm
                    onAddEmployee={this.props.addEmployee}
                />
                {this.displayInfo()}
            </View>
        );
    };
};



function mapStateToProps(state) {
    return {
        currentUser: state.authReducer.currentUser,
        error: state.employeesReducer.error,
        loading: state.employeesReducer.loading,
        msg: state.employeesReducer.msg,
        employees: state.employeesReducer.employees
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addEmployee: async ({ name, phone, shift }) => {
            try {
                dispatch(employeesLoadingAction(true));
                await managerApi.post('/employees', { name, phone, shift });
                dispatch(employeesLoadingAction(false));
            } catch (error) {
                dispatch(employeesErrorAction(error.message));
                console.log(error.message);
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeScreen);