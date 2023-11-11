import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const login = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data)
  setData(response.data)
}

export const registerUsuario = async(url: string, data: Object, setData: Function) => { 
  const response = await api.post(url, data)
  setData(response.data)
}