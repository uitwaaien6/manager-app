import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { employeesGetAction, employeesErrorAction, employeesLoadingAction } from '../actions/employeesActions';
import { NavigationEvents } from 'react-navigation';
import EmployeeDetailForm from '../components/EmployeeDetailForm';

class EmployeeDetailScreen extends React.Component {

    state = {
        employee: this.props.navigation.getParam('employee'),
        name: '',
        phone: '',
        shift: ''
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

    displayEmployeeDetail(employee) {

        if (employee) {
            return (
                <View>
                    <NavigationEvents 
                        onDidFocus={() => {
                            const { name, phone, shift } = this.state.employee;
                            this.setState({ name, phone, shift });
                        }} 
                    />

                    <EmployeeDetailForm
                        employee={this.state.employee}
                        name={this.state.name}
                        phone={this.state.phone}
                        shift={this.state.shift}
                        onSave={this.props.editEmployee}
                        onFire={this.props.deleteEmployee}
                    />

                    {this.displayInfo()}
                </View>
            );
        }

        return null;
    }

    componentDidMount() {
        this.checkIfUserAuthenticated();
        const { name, phone, shift } = this.state.employee;
        this.setState({ name, phone, shift });
    }

    render() {
        return (
            this.displayEmployeeDetail(this.state.employee)
        );
    };
};

const styles = StyleSheet.create({
    detailSection: {
        flexDirection: 'row'
    }
});

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