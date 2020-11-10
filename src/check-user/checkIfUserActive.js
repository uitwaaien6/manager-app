import managerApi from '../api/managerApi';
import { navigate } from '../navigation/navigationRef';
import { AsyncStorage } from 'react-native';

export default async function checkIfUserActive() {
    try {
        const token = await AsyncStorage.getItem('token');
        const jwtExpiration = await AsyncStorage.getItem('jwtExpiration');

        if (token && jwtExpiration) {
            const response = await managerApi.get('/api/auth/verification/verify-account/check-user-status');
            const { status } = response.data;
            if (status == 'active') {
                navigate('MainFlow');
            }
        } else {
            navigate('AuthFlow');
        }
    } catch (error) {
        console.log(error.message);
    }
}