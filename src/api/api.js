import axios from './axiosInstance'

const getMovies = () => axios.get(`https://run.mocky.io/v3/0a81bc0e-88fe-4a31-91ff-d8e771d0954b`)

export default {
  getMovies
}