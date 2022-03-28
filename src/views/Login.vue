<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form
        ref="userForm"
        :model="user"
        status-icon
        :rules="rules"
      >
        <div class="title">
          admin
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            type="text"
            prefix-icon="user"
          />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            v-model="user.userPwd"
            type="password"
            prefix-icon="view"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="login"
          >
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data () {
    return {
      user: {
        username: '',
        userPwd: ''
      },
      rules: {
        username: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fcff;
  margin-top: -3vh;

  .modal {
    width: 600px;
    background: white;
    padding: 50px;
    border-radius: 5px;
    box-shadow: 0 0 10px 8px #c7c9cb4b;
    line-height: 1.5;

    .title {
      font-size: 50px;

      text-align: center;
      margin-bottom: 40px;
    }

    .login-btn {
      width: 100%;

    }
  }

}

</style>
