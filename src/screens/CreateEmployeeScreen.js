import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { employeesErrorAction, employeesLoadingAction } from '../actions/employeesActions';
import CreateEmployeeForm from '../components/CreateEmployeeForm';
import checkIfUserActive from '../check-user/checkIfUserActive';
import DisplayPageInfo from '../components/DisplayPageInfo';

class CreateEmployeeScreen extends React.Component {

    state = {
        name: null,
        phone: null,
        shift: null
    }

    componentDidMount() {
        checkIfUserActive();
    }

    render() {
        return (
            <View>
                <CreateEmployeeForm
                    onAddEmployee={this.props.addEmployee}
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
        addEmployee: async ({ name, phone, shift }) => {
            try {
                dispatch(employeesLoadingAction(true));
                const response = await managerApi.post('/employees', { name, phone, shift });
                const { success } = response.data;
                if (success) {
                    dispatch(employeesLoadingAction(false));
                }
            } catch (error) {
                dispatch(employeesErrorAction('Something went wrong while creating an employee!'));
                console.log(error.message);
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeScreen);