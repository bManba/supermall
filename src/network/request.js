import axios from 'axios'

export function resquest(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  //axios拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
  //响应拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  return instance(config)
}
