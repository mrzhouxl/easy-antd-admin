<template>
  <a-layout-header
    style="
      background: #fff;
      padding: 0;
      display: flex;
      justify-content: space-between;
    "
  >
    <div>
      <span
        class="menuUnOf"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </span>
      <span class="reload" @click="reload()">
        <ReloadOutlined />
      </span>
    </div>
    <div style="margin-right: 10px">
      <Dropdown>
        <a-avatar>silent</a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="signOut">
              <a><poweroff-outlined /> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { message, Dropdown } from "ant-design-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ReloadOutlined,
    Dropdown,
  },
  setup() {
    const route = useRouter();
    const reload = () => {
      route.go(0);
    };
    const signOut = () => {
      //清除token
      localStorage.removeItem("token");
      route.push("/home");
    };
    return { reload, signOut };
  },
});
</script>
<style scoped>
.reload {
  font-size: 20px;
  cursor: pointer;
}
.menuUnOf {
  font-size: 20px;
  height: 64px;
  line-height: 64px;
  vertical-align: top;
  padding: 0 22px;
  display: inline-block;
  cursor: pointer;
  -webkit-transition: all 0.3s, padding 0s;
  transition: all 0.3s, padding 0s;
}
</style>