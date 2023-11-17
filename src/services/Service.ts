import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const login = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data)
  setData(response.data)
}

export const registerUser = async(url: string, data: Object, setData: Function) => { 
  const response = await api.post(url, data)
  setData(response.data)
}


export const find = async (url: string, setData: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setData(resposta.data)
}

export const register = async (url: string, data: Object, setData: Function, header: Object) => {
  const resposta = await api.post(url, data, header)
  setData(resposta.data)
}

export const update = async (url: string, data: Object, setData: Function, header: Object) => {
  const resposta = await api.put(url, data, header)
  setData(resposta.data)
}

export const deleteItem = async (url: string, header: Object) => {
  await api.delete(url, header)
}