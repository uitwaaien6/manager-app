import axios from 'axios';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const instance = axios.create({
    baseURL: 'https://b2ed694fcfef.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {

        try {
            const token = await AsyncStorage.getItem('token');
            const expiration = await AsyncStorage.getItem('expiration');

            if (token) {
                if (Date.now() > parseFloat(expiration)) {
                    console.log('JWT has expired');
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('expiration');
                    navigate('AuthFlow');
                    return config;
                } else {
                    console.log('jwt is still valid');
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        } catch (error) {
            console.log(error.message);
        }
    },
    async (err) => {
        return Promise.reject(err);
    }
)

export default instance;