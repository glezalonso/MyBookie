import axios from '../libs/axios'

export const login = (values) => axios.post('/api/login', values)

export const register = (values) => axios.post('/api/users/register', values)

export const getUsers = () => axios.get('/api/users')

export const getUser = (id) => axios.get(`/api/users/${id}`)

export const updateUser = (id,body) => axios.put(`/api/users/${id}`, body)

export const deleteUser = (id) => axios.delete(`/api/users/${id}`)
