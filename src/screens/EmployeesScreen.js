import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loadingAction, signoutAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { getEmployeesAction } from '../actions/employeesActions';
import { NavigationEvents } from 'react-navigation';

class EmployeesScreen extends React.Component {

    async checkIfUserAuthenticated() {
        const token = await AsyncStorage.getItem('token');
        const exp = await AsyncStorage.getItem('token');
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

    componentDidMount() {
        this.checkIfUserAuthenticated();
        this.props.getEmployees();
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
        currentUser: state.auth.currentUser,
        employees: state.employees.employees
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEmployees: async () => {
            const response = await managerApi.get('/employees');
            const employees = response.data;
            dispatch(getEmployeesAction(employees));
            console.log(employees);
        },
        signout: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('expiration');
            dispatch(signoutAction());
            navigate('AuthFlow');
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);