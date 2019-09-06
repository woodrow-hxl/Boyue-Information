<template>
  <div class="login-view">
    <a-form id="components-form-demo-normal-login" class="login-form">
      <a-form-item>
        <a-input placeholder="Username" ref="userRef" v-model="uname">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input type="password" placeholder="Password" v-model="psd" ref="psdRef">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" @click="register">注册</a-button>
        <router-link class="icon" to="/loginview" tag="div">
          <a href>已有账号，立即登录！</a>
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    uname: "",
    psd: "",
    username: ["hxl"],
    password: ["123"]
  }),
  methods: {
    register() {
      let a = this.username.indexOf(this.$refs.userRef.value);
        if (!this.$refs.userRef.value.trim()) {
          alert("请输入账号!");
          this.$refs.userRef.focus();
        } else if (!this.$refs.psdRef.value.trim()) {
          alert("请输入密码!");
          this.$refs.psdRef.focus();
        } else if (a >= 0) {
          alert("此账号已被注册,请重新注册!");
        } else {
          alert(`账号密码注册成功,请重新登录!`);
          this.username.push(this.uname);
          this.password.push(this.psd);
          window.localStorage.setItem("username", this.username);
          window.localStorage.setItem("password", this.password);
      } 
    }
  },
  mounted() {
    this.$refs.userRef.value = "";
    this.$refs.psdRef.value = "";
    this.$refs.userRef.focus();
    let dataname = window.localStorage.getItem("username");
    let datapsd = window.localStorage.getItem("password");
    if (dataname) {
      this.username = dataname.split(",");
    }
    if (datapsd) {
      this.password = datapsd.split(",");
    }
  },
};
</script>
<style lang="scss" scoped>
.login-view {
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
      margin-top: 2rem;
    }
  }
}
</style>