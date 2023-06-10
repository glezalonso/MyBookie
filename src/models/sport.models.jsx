import axios from "../libs/axios"

export const getSports = () =>axios.get('/api/sports')

export const getSport = (id) =>  axios.get(`/api/sports/${id}`)

export const createSport = (body) => axios.post('/api/sports', body)

export const updateSport = (id, body) => axios.put(`/api/sports/${id}`, body)

export const deleteSport = (id) => axios.delete(`/api/sports/${id}`)
