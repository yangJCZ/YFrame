import axios from 'axios'
import store from '@/store'
import config from './config'


const instance = axios.create({
    baseURL: config.baseUrl,
    timeout: config.timeout,
    headers: config.headers,
    withCredentials: config.withCredentials
})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // 1. 携带token发送
        let token = store.state.token
        if (token){
             config.headers.token = token
        }
        return config
    },

    error => {
        // Debug 调试用于输出到控制台
        console.log('request', error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        let data = response.data
        if (data == undefined){
            // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
            data = JSON.parse(response.request.responseText)
        }

        return data
    },

    error => {
        if (error && error.response){
            switch (error.response.status) {
                case 400:
                    error.message = '请求出错'
                    break
                case 401:
                    error.message = '授权失败，请重新登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
            }
        }
        console.log('response', error)
        return Promise.reject(error)
    }
)

const http = (options) => new Promise(
    (resolve, reject) => {
        instance(options)
            .then(response => {
                // // 自定义错误代码
                // if (response.code == 0){
                //     resolve(response)
                // } else {
                //     console.log('自定义错误', response.message)
                //     reject(response.message)
                // }
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    }
)
export default http
