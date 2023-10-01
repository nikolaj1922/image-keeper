import axios from 'axios'

const url = process.env.NEXT_PUBLIC_API_URL

const axiosClient = axios.create({
  baseURL: url
})

export default axiosClient
