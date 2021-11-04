
<template>
  <div class="login" id="login">
    <div class="log-email">
      <div class="log-left">
        <img src="https://aliyuncdn.antdv.com/v2/assets/logo.1ef800a8.svg" style="width: 98px; height: 45px" />
        <div class="bg">
          <img src="@/assets/bg.png" style="width: 382px; height: 348px" />
        </div>
      </div>
      <div class="log-right">
        <div class="logo-title">
          <span>Easy Antd Admin</span>
        </div>
        <div class="inputLogin">
          <input
            class="my-input"
            type="text"
            placeholder="请输入账号"
            v-model="username"
            @keyup.enter.native="login()"
          />
          <input
            class="my-input md-33"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            @keyup.enter.native="login()"
          />
          <div class="Idpas">
            <span @click="idps">忘记密码？</span>
          </div>
        </div>
        <br />
        <a-button style="margin-top: 20px" class="loginBtn" @click="login">
          登录
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const login = async () => {
      if (username.value === "admin" && password.value === "admin") {
        console.log(username.value,password.value)
        router.push("/index");
      }
    };
    const idps = () => {
      message.info("请联系管理员！");
    };
    return {
      idps,
      login,
      username,
      password,
    };
  },
});
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f3f4f6;
}
.log-email {
  display: flex;
  text-align: center;
  width: 946px;
}
.log-left {
  display: flex;
  flex-direction: column;
  width: 452px;
  height: 520px;
  background: #00b375;
  justify-content: space-between;
}
.log-right {
  width: 452px;
  height: 520px;
  background: #fff;
}
.logo-title {
  margin-top: 81px;
  font-size: 18px;
  font-weight: 600;
}
.log-left .bg {
}
.log-left img {
  margin: 35px 0 0 35px;
}
.inputLogin {
  padding-top: 41px;
}
.md-33 {
  margin-top: 33px;
}
.inputLogin .my-input {
  border: none;
  width: 356px;
  height: 44px;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}
.inputLogin .Idpas {
  margin-left: 50px;
  display: flex;
  flex-direction: row-reverse;
  padding-top: 20px;
  width: 356px;
  color: #c0c4cc;
  cursor: pointer;
}
.loginBtn {
  width: 356px;
  height: 54px;
  background: #00b375;
  opacity: 1;
  border-radius: 27px;
  color: #fff;
}
</style>