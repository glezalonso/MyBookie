import axios from '../libs/axios'

export const getTeams = () => axios.get('/api/teams')

export const getTeam = (id) => axios.get(`/api/teams/${id}`)

export const createTeam = (body) => axios.post('/api/teams', body)

export const updateTeam = (id, body) => axios.put(`/api/teams/${id}`, body)

export const deleteTeam = (id) => axios.delete(`/api/teams/${id}`)

export const addPlayer = (id, body) => axios.post(`/api/teams/addplayer/${id}`, body)

export const removePlayer = (id, data) => axios.delete(`/api/teams/removeplayer/${id}`, { data })
