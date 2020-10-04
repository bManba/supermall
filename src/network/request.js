import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '123456789',
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
