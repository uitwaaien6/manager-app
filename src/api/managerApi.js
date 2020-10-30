import axios from 'axios';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from 'react-native';

const instance = axios.create({
    baseURL: 'https://3a9ae9240b8c.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    async (err) => {
        return Promise.reject(err);
    }
)

export default instance;