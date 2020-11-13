import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import PasswordResetCodeScreen from './src/screens/PasswordResetCodeScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import CreateEmployeeScreen from './src/screens/CreateEmployeeScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import TestMapScreen from './src/screens/TestMapScreen';
import { setNavigator } from './src/navigation/navigationRef';
import initializeStore from './src/stores/store';

const linking = {
  prefixes: ['https://a0e5f1114ab9.ngrok.io'],
  config: {
    Home: 'Signup',
    Details: {
      path: 'Signup'
    }
  }
};

const navigator = createSwitchNavigator({
  AuthFlow: createStackNavigator({ 
    Signup: { 
      screen: SignupScreen,
      linking
    },
    Signin: { 
      screen: SigninScreen 
    },
    PasswordResetCode: {
      screen: PasswordResetCodeScreen
    },
    PasswordReset: {
      screen: PasswordResetScreen
    },
    TestMap: {
      screen: TestMapScreen
    }
  }, {
    initialRouteName: "Signin"
  }),
  MainFlow: createBottomTabNavigator({ 
    EmployeesFlow: createStackNavigator({ 
      Employees: { 
        screen: EmployeesScreen 
      },
      CreateEmployee: { 
        screen: CreateEmployeeScreen 
      },
      EmployeeDetail: { 
        screen: EmployeeDetailScreen 
      }
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
