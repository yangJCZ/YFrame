import Mock from 'mockjs'

/*
* 模块倒入
* */
import * as login from './modules/login'
import * as user from './modules/user'
const mocks = [
    login,
    user
]

createMock()

function createMock(){

    for (let mod of mocks){

        for(let key in mod){
            (
                (res) => {
                    if (res.isOpen !== false) {
                        let url = 'http://127.0.0.1:8080'
                        if(!url.endsWith("/")) {
                            url = url + "/"
                        }
                        url = url + res.url
                        Mock.mock(new RegExp(url), res.type, (opts) => {
                            opts['data'] = opts.body ? JSON.parse(opts.body) : null
                            delete opts.body
                            console.log('\n')
                            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
                            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
                            return res.data
                        })
                    }
                }
            )(mod[key]() || {})
        }

    }


}


//
// let openMock = true
// fnCreate(login, openMock)
//
// function fnCreate (mod, isOpen = true) {
//
//     if (isOpen) {
//         for (var key in mod) {
//             (
//                 (res) => {
//                     if (res.isOpen !== false) {
//                         let url = 'http://127.0.0.1:8080'
//                         if(!url.endsWith("/")) {
//                             url = url + "/"
//                         }
//                         url = url + res.url
//                         Mock.mock(new RegExp(url), res.type, (opts) => {
//                             opts['data'] = opts.body ? JSON.parse(opts.body) : null
//                             delete opts.body
//                             console.log('\n')
//                             console.log('%cmock拦截, 请求: ', 'color:blue', opts)
//                             console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
//                             return res.data
//                         })
//                     }
//                 }
//             )(mod[key]() || {})
//         }
//     }
// }
