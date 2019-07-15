/*
 * 登录模块
 */

export const login = () => {
    const data = {
        code: 200,
        msg: null,
        data: {
            id: 1,
            username: 'yang.jianchao',
            token: '77ae89be36504adfb5c09ef71409ea0e',
            "expireTime": "2018-09-01T16:24:50.473+0000",
        }
    }
    return {
        url: "login",
        type: 'post',
        data
    }
}
