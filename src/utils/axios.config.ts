// Importing helper modules
import axios from 'axios'

const api = axios.create({
	baseURL: 'https://t620meotvl.execute-api.eu-central-1.amazonaws.com/prod',
})

export default api