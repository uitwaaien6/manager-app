import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { authSignoutAction } from '../actions/authActions';
import managerApi from '../api/managerApi';
import { connect } from 'react-redux';
import { navigate } from '../navigation/navigationRef';
import { employeesGetAction, employeesLoadingAction } from '../actions/employeesActions';
import { NavigationEvents } from 'react-navigation';
import checkIfUserActive from '../check-user/checkIfUserActive';
import DisplayPageInfo from '../components/DisplayPageInfo';

class EmployeesScreen extends React.Component {

    componentDidMount() {
        checkIfUserActive();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents 
                    onDidFocus={() => {
                        this.props.getEmployees();
                    }} 
                />

                <FlatList
                    data={this.props.employees}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        const employee = item;
                                        navigate('EmployeeDetail', { employee });
                                    }}
                                    style={styles.employeesContainer}
                                >
                                    <View style={styles.employee}>
                                        <Text style={{ fontSize: 24 }}>{item.name}</Text>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>#{index + 1}</Text>
                                    </View>

                                    

                                </TouchableOpacity>


                            </View>
                        );
                    }}
                />

                <DisplayPageInfo
                    info={this.props}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
    employeesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    employee: {
        borderRadius: 8,
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '88%',
        padding: 10,
        margin: 10
    },
    employeeText: {
        
    }
})

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
            dispatch(employeesLoadingAction(true));
            const response = await managerApi.get('/employees');
            const { success, employees } = response.data;
            if (success) {
                dispatch(employeesGetAction(employees));
            }
            dispatch(employeesLoadingAction(false));
        },
        signout: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('expiration');
            dispatch(authSignoutAction());
            dispatch(employeesGetAction([]));
            navigate('AuthFlow');
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);