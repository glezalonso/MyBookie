import axios from '../libs/axios'

export const getSeasons = () => axios.get('/api/seasons')

export const getSeason = (id) => axios.get(`/api/seasons/${id}`)

export const createSeason = (body) => axios.post('/api/seasons', body)

export const updateSeason = (id, body) => axios.put(`/api/seasons/${id}`, body)

export const deleteSeason = (id) => axios.delete(`/api/seasons/${id}`)
