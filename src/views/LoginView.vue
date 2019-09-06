<template>
  <div class="login-view">
    <div class="login-seccuss" v-show="Flag">
      <span class="avatar"><a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></span>
      <span class="icon ">
        <a-icon type="man" />
      </span>
      <span class="login-name">{{uname}}</span>
      <span class="login-out" @click="loginOut">退出登录</span>
      <div class="login-info">
        个人信息
      </div>
    </div>
    <div class="login-item" v-show="!Flag">
      <a-form id="components-form-demo-normal-login" class="login-form">
        <a-form-item>
          <a-input placeholder="Username" v-model="uname" ref="userRef">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password" placeholder="Password" v-model="psd" ref="psdRef">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
          >记住密码</a-checkbox>
          <a class="login-form-forgot" href>忘记密码</a>
          <a-button type="primary" class="login-form-button" @click="login">登录</a-button>
          <router-link class="item" to="/registerview" tag="div">
            <a href>立即注册!</a>
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    Flag: false,
    uname: "",
    psd: "",
    username: [],
    password: []
  }),
  methods: {
    login() {
      let user = this.$refs.userRef.value.trim();
      let psw = this.$refs.psdRef.value.trim();
      let a = this.username.indexOf(user);
      let b = this.password.indexOf(psw);
      if (!user) {
        alert("请输入账号!");
        this.$refs.userRef.focus();
      } else if (!psw) {
        alert("请输入密码!");
        this.$refs.psdRef.focus();
      } else if (a >= 0 && b >= 0) {
        alert("登录成功,请等待进入个人页面!");
        // window.localStorage.setItem("Flag",true);
        this.Flag=true
      } else {
        alert("登录失败,请检查账号或密码是否正确!");
      }
    },
    loginOut(){
      this.Flag=false
      // window.localStorage.removeItem("Flag",false);
    }
  },
  mounted() {
    this.$refs.userRef.focus();
    let dataname = window.localStorage.getItem("username");
    let datapsd = window.localStorage.getItem("password");
    if (dataname) {
      this.username = dataname.split(",");
    }
    if (datapsd) {
      this.password = datapsd.split(",");
    }
  }
};
</script>
<style lang="scss" scoped>
.login-view{
  .login-seccuss{
    position: relative;
    margin: 1rem;
  }
  .avatar{
    position: absolute;
    top:0;
    left: 0;
  }
  .icon{
    position: absolute;
    top:0.2rem;
    left: 2.5rem;
    color:aquamarine;
  }
  .login-name{
    display: inline-block;
    margin:0 3rem ;
    height: 3rem;
    line-height: 4rem;
    font-size: 1rem;
    font-weight: 700;
    font-style:italic;
  }
  .login-out{
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 3.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    background-color: #42bd56;
    color:white;
  }
  .login-info{
    margin-top: 1rem;
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #eee;
  }
}
.login-item {
  width: 70vw;
  margin: 5rem auto;
  #components-form-demo-normal-login {
    line-height: 2rem;
    .login-form {
      max-width: 300px;
    }
    .login-form-forgot {
      float: right;
    }
    .login-form-button {
      width: 100%;
    }
  }
}
</style>