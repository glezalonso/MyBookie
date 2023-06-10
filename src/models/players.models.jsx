import axios from "../libs/axios";

export const getPlayers =  async () =>  axios.get('/api/players')

export const getPlayer = (id) => axios.get(`/api/players/${id}`)

export const createPlayer = (body) => axios.post('/api/players', body)

export const updatePlayer = (id, body) => axios.put(`/api/players/${id}`, body)

export const deletePlayer = (id) => axios.delete(`/api/players/${id}`)