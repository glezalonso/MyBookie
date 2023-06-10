import axios from "../libs/axios"

export const getLeagues = () => axios.get('/api/leagues')

export const getLeague = (id) =>  axios.get(`/api/leagues/${id}`)

export const createLeague = (body) => axios.post('/api/leagues', body)

export const updateLeague = (id, body) => axios.put(`/api/leagues/${id}`, body)

export const deleteLeague = (id) =>  axios.delete(`/api/leagues/${id}`)
