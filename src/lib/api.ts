import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('yabbl.token');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : null
  }
});

export const updateApiToken = (token?: string, durationInSeconds?: number) => {
  let authorizationHeader: string | null = null;

  if (token) {
    const settings = durationInSeconds ? {
      expires: new Date(new Date().getTime() + durationInSeconds * 1000)
    } : undefined;

    Cookies.set('yabbl.token', token, settings);
    authorizationHeader = `Bearer ${token}`;
  } else {
    Cookies.remove('yabbl.token');
  }

  api.defaults.headers.Authorization = authorizationHeader;
};

export default api;
