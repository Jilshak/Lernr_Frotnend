import axios from 'axios'

const api = axios.create({
    baseURL: `https://lernr-backend.onrender.com`
})

export default api

export const base = 'ws://https://lernr-backend.onrender.com'
