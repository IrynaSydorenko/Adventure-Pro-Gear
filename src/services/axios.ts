import axios from 'axios';
import { getServerSession } from 'next-auth';
import { options } from '@/config';

export const token: { access: string | null; refresh: string | null } = {
  access: null,
  refresh: null,
};

const axiosInstance = axios.create({
  baseURL: 'https://authentic-laughter-production.up.railway.app/',
});

axios.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getServerSession(options);
    const publicEndpoints = [
      '/api/public/auth/refresh-token',
      '/api/public/password-reset/request',
      '/api/public/password-reset/reset',
      '/api/public/products',
      'api/public/auth/login',
      'api/public/product',
    ];
    const needsAuth = !publicEndpoints.some(endpoint => config?.url?.startsWith(endpoint));

    if (needsAuth && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${session?.user?.token.accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export const refreshTokenService = async (refreshToken: string) => {
  const response = await axios.post('/api/public/auth/refresh-token', {
    refreshToken,
  });
  console.log('RefreshToken Response: ', response);
  if (response.status >= 400) {
    throw new Error(`Refresh token error: ${response.status}`);
  }
  return response;
};

export const getProducts = async () => {
  try {
    /* return {data:undefined}; */ const products = await axiosInstance.get('/api/public/products');
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId: number) => {
  try {
    const product = await axiosInstance.get(`/api/public/products/${productId}`);
    return product;
  } catch (error) {
    console.log('from getProductById');
  }
};

export const getReviewsById = async (id: number) => {
  try {
    const review = await axiosInstance.get(`/api/public/products/reviews/${id}`);
    return review;
  } catch (error) {
    console.log('from getReviewsById');
  }
};

export const getAverageRatingByProductId = async (productId: number) => {
  try {
    const averageRating = await axiosInstance.get(
      `/api/public/products/reviews/average-rating?productId=${productId}`
    );
    return averageRating;
  } catch (error) {
    console.log('from getAverageRatingByProductId');
  }
};

export const getAllReviews = async (productId: number) => {
  try {
    const reviews = await axiosInstance.get(`api/public/products/reviews?productId=${productId}`);
    return reviews;
  } catch (error) {
    console.log('from getAllReviews');
  }
};

export const signUpService = async (credentials: any) => {
  const { name, surname, email, password } = credentials;
  return await axiosInstance.post('/api/public/registration/register', {
    name,
    surname,
    email,
    password,
  });
};

export const signInService = async (credentials: any) => {
  const { email, password } = credentials;
  const response = await axiosInstance.post('api/public/auth/login', { email, password });
  console.log('AxiosResponse: ', response);
  return response;
};

export const getUserInfoService = async (accessToken: any) => {
  try {
    const response = await axiosInstance.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to retrieve user information:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const forgotPasswordService = async (email: FormDataEntryValue) => {
  try {
    const sendEmail = await axiosInstance.post('/api/public/password-reset/request', {
      email,
    });
    return sendEmail.status;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordService = async (
  token: FormDataEntryValue | null,
  newPassword: FormDataEntryValue,
  confirmPassword: FormDataEntryValue
) => {
  try {
    const resetPassword = await axiosInstance.post('/api/public/password-reset/reset', {
      token,
      newPassword,
      confirmPassword,
    });
    console.log(resetPassword);
    return resetPassword.status;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  /* return {data:undefined}; */ return await axiosInstance.get('/api/users');
};

export const deletePost = async (id: string) => {
  /* return {data:undefined}; */ return await axiosInstance.delete(`/api/v1/products/${id}`);
};

export const updateUserDataService = async (personalData: any) => {
  const { name, surname, phone, street, city } = personalData;
  try {
    const response = await axiosInstance.put('/api/users/me/update', {
      name,
      surname,
      phone,
      street,
      city,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePasswordService = async (personalData: any) => {
  const { password, confirmPassword } = personalData;
  try {
    const response = await axiosInstance.put('/api/users/me/update-password', {
      password,
      confirmPassword,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmailService = async (personalData: any) => {
  const { email, password, confirmpassword } = personalData;
  try {
    const response = await axiosInstance.put('/api/users/me/update-email', {
      email,
      password,
      confirmpassword,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
