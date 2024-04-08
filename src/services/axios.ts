import axios from 'axios';
import { getServerSession } from 'next-auth';
import {options} from '@/config'

const axiosInstance = axios.create({
  baseURL: 'https://prime-tax-production.up.railway.app/',
});

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getServerSession(options);

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${session?.user?.token.access}`;
    }

    return config;
  },
  error => Promise.reject(error)
)

// const session = getServerSession(options);

export const getProducts = async () => {
  /*return {data:undefined};*/ return await axiosInstance.get('/api/v1/products');
};

export const signUpService = async (credentials: any) => {
  const { name, surname, email, password } = credentials;
  return await axiosInstance.post(
    '/api/public/registration/register',
    {
      name,
      surname,
      email,
      password,
    }
  );
};

export const signInService = async (credentials: any) => {
  return await axiosInstance.post('api/public/auth/signin', credentials)
}

export const getUserInfoService = async () => {
   return await axiosInstance.get('/api/users/me')
}

export const getUsers = async () => {
  /*return {data:undefined};*/ await axiosInstance.get('/api/users');
};

export const deletePost = async (id: string) => {
  /*return {data:undefined};*/ return await axiosInstance.delete(
    `/api/v1/products/${id}`
  );
};
