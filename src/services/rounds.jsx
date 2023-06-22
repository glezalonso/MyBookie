import axios from '../libs/axios'

export const getRounds = () => axios.get('/api/rounds')

export const getRound = (id) => axios.get(`/api/rounds/${id}`)

export const createRound = (body) => axios.post('/api/rounds', body)

export const updateRound = (id, body) => axios.put(`/api/rounds/${id}`, body)

export const deleteRound = (id) => axios.delete(`/api/rounds/${id}`)
