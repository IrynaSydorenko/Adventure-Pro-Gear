import axios from 'axios';

const axiosInstance = axios.create({
  // Customize other axios options as needed
  baseURL: 'https://towering-house-production.up.railway.app',
  // maxRedirects: 0, // Prevent axios from automatically following redirects
});

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is a redirect (status code 3xx)
    if (response.status === 301 || response.status === 302 || response.status === 307 || response.status === 308) {
      // Manually make a new request to the redirect URL
      console.log('Redirected URL:', response.headers.location);
      console.log('Response status code:', response.status);
      return axiosInstance({
        method: response.config.method, // Use the original HTTP method
        url: response.headers.location, // Redirect URL
        // You may need to include other request configuration options like data, params, headers, etc.
        // For example:
        // data: response.config.data,
        // params: response.config.params,
        // headers: response.config.headers,
      });
    }
    // For non-redirect responses, just return the response
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  return {data:undefined}; return await axiosInstance.get('/api/v1/products');
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

export const getUsers = async () => {
  return {data:undefined}; await axiosInstance.get('/api/users');
};

export const deletePost = async (id: string) => {
  return {data:undefined}; return await axiosInstance.delete(
    `/api/v1/products/${id}`
  );
};
