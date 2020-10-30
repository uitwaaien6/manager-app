import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';

import initializeStore from './src/store';

const navigator = createSwitchNavigator({
  AuthFlow: createStackNavigator({ Signup: SignupScreen, Signin: SigninScreen }),
  MainFlow: createBottomTabNavigator({ Employees: EmployeesScreen })
});

const App = createAppContainer(navigator);
const store = initializeStore();

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
