import axios from '../libs/axios'

export const getMatches = () => axios.get('/api/matches')

export const getMatch = (id) => axios.get(`/api/matches/${id}`)

export const createMatch = (body) => axios.post('/api/matches', body)

export const updateMatch = (id, body) => axios.put(`/api/matches/${id}`, body)

export const deleteMatch = (id) => axios.delete(`/api/matches/${id}`)

export const addLineUp = (id, body) => axios.post(`/api/matches/addlineup/${id}`, body)

export const removeLineUp = (id, data) => axios.delete(`/api/matches/removelineup/${id}`, { data })

export const closeMatch = (id, body) => axios.put(`/api/matches/closematch/${id}`, body)
