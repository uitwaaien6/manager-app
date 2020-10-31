import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import AuthForm from '../components/AuthForm';
import { loadingAction, signoutAction } from '../actions/authActions';
import { encryptPassword, decryptPassword } from '../encryption/coefficientFairEncryption';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';

class EmployeesScreen extends React.Component {

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
        this.checkIfUserAuthenticated();
    }

    render() {
        return (
            <View>
                <Text> Employees Screen</Text>

                <Button
                    title="Add Employee"
                    onPress={() => {
                        console.log('Hello');
                    }}
                />

                <FlatList
                    datat={[]}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <Text>{item}</Text>
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
        currentUser: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signout: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('expiration');
            dispatch(signoutAction());
            navigate('AuthFlow');
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);