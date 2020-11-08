import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';

export default async function checkIfUserAuthenticated() {
    try {
        const token = await AsyncStorage.getItem('token');
        const exp = await AsyncStorage.getItem('jwtExpiration');

        if (token && exp) {
            if (Date.now() > exp) {
                navigate('AuthFlow');
            } else {
                navigate('MainFlow');
            }
        } else {
            navigate('AuthFlow');
        }
    } catch (error) {
        console.log(error.message);
    }
}