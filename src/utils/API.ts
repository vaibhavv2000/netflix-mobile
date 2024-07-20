import axios from "axios";

let URL = 'https://netflix-next-pearl.vercel.app/';

export const API = axios.create({
 baseURL: `${URL}/api`,
});
