<template>
    <div class="login-container">

        <el-form ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="left">

            <!-- 标题 -->
            <div class="title-container"><h3 class="title">Login Form</h3></div>

            <!-- 用户名 -->
            <el-form-item prop="username">
                <base-icon icon="el-icon-user-solid" class="icon"></base-icon>
                <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                />
            </el-form-item>

            <!-- 密码 -->
            <el-form-item prop="password">
                <base-icon icon="el-icon-edit" class="icon"></base-icon>
                <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.enter.native="doLogin"
                />
            </el-form-item>

            <!-- 登录按钮 -->
            <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="doLogin">Login</el-button>

        </el-form>

    </div>
</template>

<script>

    import Cookies from 'js-cookie'

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "admin",
                    password: "11111"
                },

                loginRules: {
                    username: [{ required: true, trigger: 'blur' }],
                    password: [{ required: true, trigger: 'blur' }]
                },

                passwordType: "password",
                loading: false

            }
        },

        methods: {
             doLogin() {
                this.$refs.loginForm.validate(async valid => {

                    if (valid){
                        this.loading = true
                        try {
                            let res = await this.$api.login.login(this.loginForm)
                            if (res.msg == null){
                                // 存入用户token
                                let data = res.data
                                Cookies.set('token', data.token, { expires: 10 })
                                this.$store.commit('user/SET_TOKEN', data.token)

                                // 存入用户信息
                                this.$store.commit('user/SET_USER_NAME', data.username)
                                this.$store.commit('user/SET_USER_ID', data.id)

                                this.$router.push('/')
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                })
                            }

                            this.loading = false
                        }catch (e) {
                            this.$message({
                                type: 'error',
                                message: '登录失败：' + e.message
                            })
                            this.loading = false
                        }
                    }
                })
            }
        },
    }
</script>

<style lang="scss">

    $bg:#283443;
    $light_gray:#fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 5px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;

    .login-container {
        height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 400px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .icon {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 20px;
            font-size: 18px;
            display: inline-block;
        }

        .login-btn{
            width:100%;
            margin-bottom:30px;
        }

    }
</style>
