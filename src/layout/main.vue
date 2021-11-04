<template>
  <a-layout style="height:100%;" id="components-layout-demo-custom-trigger">
    <a-layout-sider :collapsed="collapsed" :width="208" :trigger="null">
      <div class="title">
        <span>Easy Antd Admin</span>
      </div>
      <layout-menu :collapsed="collapsed"></layout-menu>
    </a-layout-sider>
    <a-layout>
      <layout-header v-model:collapsed="collapsed"></layout-header>
      <layout-breadcrumb></layout-breadcrumb>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px',overflow:'auto' }"
      >
      <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import LayoutMenu from './menu/LayoutMenu.vue'
import LayoutHeader from './header/LayoutHeader.vue'
import Brea from './Breadcrumb/Breadcrumb.vue'
export default defineComponent({
  components:{
    LayoutMenu,
    LayoutHeader,
    LayoutBreadcrumb:Brea
  },
  setup(){
    const collapsed = ref<boolean>(false);
    return {
      collapsed
    }
  }
});
</script>
<style>
.ant-layout-sider .ant-layout-sider-dark{
  width: 256px !important;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 80px;
  background:url('@/assets/freemall.png') no-repeat ;
  text-align: center;
  background-size: contain;
}
.title{
  color: #fff;
  font-size: 25px;
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
</style>