import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: ''
});

//  attach the API_KEY with every request
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default axiosInstance