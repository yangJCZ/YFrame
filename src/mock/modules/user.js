/*
 * 用户模块
 */

export const login = () => {
    const data = {
        code: 200,
        msg: null,
        data: [
            {
                "id": 1,
                "name": "系统管理",
                "children": [
                    {
                        "id": 2,
                        "name": "角色管理"
                    },
                    {
                        "id": 3,
                        "name": "日志管理"
                    }
                ]
            }
        ]
    }
    return {
        url: "user/routes",
        type: 'get',
        data
    }
}
