import axios from "axios"

export const api = axios.create({
  //baseURL: "http://192.168.100.88:3333",
  baseURL: 'http://10.0.2.2:3333',
  timeout: 700
})