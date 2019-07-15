import axios from '../axios'


export const getUserRoutes = (param) => {
    return axios({
        url: 'user/routes',
        method: 'get',
        param
    })
}
