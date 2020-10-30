import axios from 'axios';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const instance = axios.create({
    baseURL: 'https://14fc72ddaaba.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        const expiration = await AsyncStorage.getItem('expiration');
        if (token && expiration) {
            if (Date.now() > parseFloat(expiration)) {
                console.log('JWT has expired');
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('token');
                navigate('AuthFlow');
                return config;
            } else {
                console.log('jwt is still valid');
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    async (err) => {
        return Promise.reject(err);
    }
)

export default instance;