import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TextInput } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loadingAction, signoutAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class EmployeesDetailScreen extends React.Component {

    state = {
        employee: this.props.navigation.getParam('employee')
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
                    <Text>{this.state.employee.name}</Text>
                    <Text>{this.state.employee.phone}</Text>
                    <Text>{this.state.employee.shift}</Text>

                    <Button
                        title="Save"
                        onPress={() => {
                            
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

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
        employees: state.employees.employees
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fireEmployee: ({ _id }) => {
            console.log(_id);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesDetailScreen);