import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TextInput } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loadingAction, signoutAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class CreateEmployeeScreen extends React.Component {

    state = {
        name: null,
        phone: null,
        shift: null
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

    componentDidMount() {
        
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Name"
                    value={this.state.name}
                    onChangeText={(newText) => {
                        this.setState({ name: newText });
                    }}
                />

                <TextInput
                    placeholder="Phone"
                    value={this.state.phone}
                    onChangeText={(newText) => {
                        this.setState({ phone: newText });
                    }}
                />

                <TextInput
                    placeholder="Shift"
                    value={this.state.shift}
                    onChangeText={(newText) => {
                        this.setState({ shift: newText });
                    }}
                />

                <Button
                    title="Add Employee"
                    onPress={() => {
                        const { name, phone, shift } = this.state;
                        this.props.addEmployee({ name, phone, shift });
                        console.log(this.props.employees);
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
        addEmployee: ({ name, phone, shift }) => {
            dispatch({ type: 'ADD_EMPLOYEE', payload: { name, phone, shift } });
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployeeScreen);