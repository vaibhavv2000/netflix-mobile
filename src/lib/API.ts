import axios from "axios";
import * as SecureStore from 'expo-secure-store';

let URL = 'https://netflix-next-pearl.vercel.app';

export const API = axios.create({
 baseURL: `${URL}/api`,
 headers: {
  'Content-Type': 'application/json',
 },
});

API.interceptors.request.use(
 async (config) => {
  const token = await SecureStore.getItemAsync('netflix-token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
 },
 (error) => Promise.reject(error)
);