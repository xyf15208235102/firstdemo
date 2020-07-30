import axios from 'axios'

const server = axios.create({
  baseURL: 'http://192.168.2.25:7071/rt/v1/mobile/'
})
const task = axios.create({
  baseURL: 'http://192.168.2.25:7071/rt/v1/mobile/',
  timeout: 3000,
  headers: {
    token: '1c629dc3782b81b8d2f1e256a49db4b6'
  }
})
const reqIntercept = (config) => {
  // console.log('config', config)
  if (config.headers.token) {
    config.headers.token = localStorage.getItem('token') || '1c629dc3782b81b8d2f1e256a49db4b6'
  }
  return config
}
const resIntercept = (res) => {
  // console.log('res', res)
  return res
}
const errIntercept = (err) => {
  // console.log('err', err)
  return Promise.reject(err)
}
server.interceptors.request.use(reqIntercept, errIntercept)
server.interceptors.response.use(resIntercept, errIntercept)

task.interceptors.request.use(reqIntercept, errIntercept)
task.interceptors.response.use(resIntercept, errIntercept)
export { server, task }
