import axios from 'axios';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const instance = axios.create({
    baseURL: 'https://843ce0406276.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {

        try {
            const token = await AsyncStorage.getItem('token');
            const jwtExpiration = await AsyncStorage.getItem('jwtExpiration');

            if (token && jwtExpiration) {
                if (Date.now() > parseFloat(jwtExpiration)) {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('jwtExpiration');
                    navigate('AuthFlow');
                    return config;
                } else {
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