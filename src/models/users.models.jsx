import axios from '../libs/axios'

export const login = (values) => axios.post('/api/login', values)
