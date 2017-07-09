import { create } from 'apisauce';
import Config from 'react-native-config';

const api = create({
    baseURL: Config.API_BASE_URL,
    headers: { 
        Accept: 'application/json',
    },
});

class ApiService {
    getProfile = (providerId, workerId) => api.get(`/provider/${providerId}/worker/${workerId}`);
    setAuthToken = (token) => {
        api.setHeader('Authorization', `Bearer ${token}`);
    }
}

export default new ApiService();