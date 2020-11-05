import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { authSignoutAction } from '../actions/authActions';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { employeesGetAction } from '../actions/employeesActions';
import { NavigationEvents } from 'react-navigation';

class EmployeesScreen extends React.Component {

    async checkIfUserAuthenticated() {
        const token = await AsyncStorage.getItem('token');
        const exp = await AsyncStorage.getItem('token');
        if (token && exp) {
            if (Date.now() > exp) { navigate('AuthFlow'); }
        } else {
            navigate('AuthFlow');
        }
    }

    componentDidMount() {
        this.checkIfUserAuthenticated();
    }

    render() {
        return (
            <View>
                <NavigationEvents 
                    onDidFocus={() => {
                        this.props.getEmployees();
                    }} 
                />

                <Text> Employees Screen</Text>

                <FlatList
                    data={this.props.employees}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        const employee = item;
                                        navigate('EmployeesDetail', { employee });
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

                <Button
                    title="Create Employee"
                    onPress={() => {
                        navigate('CreateEmployee');
                    }}
                />

                <Button
                    title="Sign out"
                    onPress={() => {
                        this.props.signout();
                    }}
                />
            </View>
        );
    };
};

function mapStateToProps(state) {
    return {
        currentUser: state.authReducer.currentUser,
        employees: state.employeesReducer.employees,
        error: state.employeesReducer.error,
        loading: state.employeesReducer.loading,
        msg: state.employeesReducer.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEmployees: async () => {
            const response = await managerApi.get('/employees');
            const employees = response.data;
            dispatch(employeesGetAction(employees));
        },
        signout: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('expiration');
            dispatch(authSignoutAction());
            navigate('AuthFlow');
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);