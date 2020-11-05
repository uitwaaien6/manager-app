import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import CreateEmployeeScreen from './src/screens/CreateEmployeeScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import { setNavigator } from './src/navigation/navigationRef';
import initializeStore from './src/stores/store';

const navigator = createSwitchNavigator({
  AuthFlow: createStackNavigator({ 
    Signup: SignupScreen, 
    Signin: SigninScreen 
  }),
  MainFlow: createBottomTabNavigator({ 
    EmployeesFlow: createStackNavigator({ 
      Employees: EmployeesScreen,
      CreateEmployee: CreateEmployeeScreen,
      EmployeeDetail: EmployeeDetailScreen
    }),

  })
});

const App = createAppContainer(navigator);
const store = initializeStore();

export default () => {
  return (
    <Provider store={store}>
      <App ref={setNavigator}/>
    </Provider>
  );
};
