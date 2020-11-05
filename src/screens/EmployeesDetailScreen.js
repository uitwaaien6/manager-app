import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TextInput } from 'react-native';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { getEmployeesAction } from '../actions/employeesActions';

class EmployeesDetailScreen extends React.Component {

    state = {
        employee: this.props.navigation.getParam('employee'),
        name: this.props.navigation.getParam('employee').name,
        phone: this.props.navigation.getParam('employee').phone,
        shift: this.props.navigation.getParam('employee').shift
    }

    checkIfUserAuthenticated() {
        const { token, exp } = this.props.currentUser;
        if (token) {
            if (Date.now() > exp) {
                console.log('This users token has expired go fuck yourself');
                navigate('AuthFlow');
            } else {
                console.log('Current user has the token its okay');
            }
        } else {
            console.log('This users token is not event exist how did you even get here');
            navigate('AuthFlow');
        }
    }

    displayEmployeeDetail(employee) {

        if (employee) {
            return (
                <View>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(newText) => {
                            this.setState({ name: newText });
                        }}
                        
                    />

                    <TextInput
                        value={this.state.phone.toString()}
                        onChangeText={(newText) => {
                            this.setState({ phone: newText });
                        }}
                    />

                    <TextInput
                        value={this.state.shift}
                        onChangeText={(newText) => {
                            this.setState({ shift: newText });
                        }}
                    />

                    <Button
                        title="Save"
                        onPress={() => {
                            const { name, phone, shift } = this.state;
                            const employeeId = this.state.employee._id;
                            this.props.editEmployee({ name, phone, shift, employeeId });
                        }}
                    />

                    <Button
                        title="Text Schedule"
                        onPress={() => {

                        }}
                    />

                    <Button
                        title="Fire"
                        onPress={() => {

                        }}
                    />
                </View>
            );
        }

        return null;
    }   

    componentDidMount() {

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
        currentUser: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        editEmployee: async ({ name, phone, shift, employeeId }) => {
            try {
                console.log(name, phone, shift, employeeId);
                await managerApi.post('/employees/edit', { name, phone, shift, employeeId });
                const response = await managerApi.get('/employees');
                const employees = response.data;
                dispatch(getEmployeesAction(employees));
            } catch (error) {
                console.log(error.message);
            }

        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDetailScreen);