import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { employeesGetAction, employeesErrorAction, employeesLoadingAction } from '../actions/employeesActions';
import EmployeeDetailForm from '../components/EmployeeDetailForm';
import checkIfUserAuthenticated from '../components/checkIfUserAuthenticated';
import DisplayPageInfo from '../components/DisplayPageInfo';

class EmployeeDetailScreen extends React.Component {

    state = {
        employee: this.props.navigation.getParam('employee')
    }

    componentDidMount() {
        checkIfUserAuthenticated();
        const { name, phone, shift } = this.state.employee;
        this.setState({ name, phone, shift });
    }

    render() {
        return (
            <View>
                <EmployeeDetailForm
                    employee={this.state.employee}
                    onSave={this.props.editEmployee}
                    onFire={this.props.deleteEmployee}
                />

                <DisplayPageInfo
                    info={this.props}
                />
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        currentUser: state.authReducer.currentUser,
        error: state.employeesReducer.error,
        loading: state.employeesReducer.loading,
        msg: state.employeesReducer.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editEmployee: async ({ name, phone, shift, employeeId }) => {
            try {
                dispatch(employeesLoadingAction(true));
                await managerApi.post('/employees/edit', { name, phone, shift, employeeId });
                const response = await managerApi.get('/employees');
                const employees = response.data;
                dispatch(employeesGetAction(employees));
            } catch (error) {
                console.log(error.message);
                dispatch(employeesErrorAction('Something went wrong while saving employee'));
            }

        },
        deleteEmployee: async (employeeId) => {
                try {
                    dispatch(employeesLoadingAction(true));
                    await managerApi.post('/employees/delete', { employeeId });
                    dispatch(employeesLoadingAction(false));
                    navigate('Employees');
                } catch (error) {
                    console.log(error.message);
                    dispatch(employeesErrorAction('Something went wrong while saving employee'));
                }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailScreen);