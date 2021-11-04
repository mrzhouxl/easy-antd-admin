<template>
  <div>
    <a-menu
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsed"
      @click="clickMenu"
      v-model:openKeys="openKeys"
    >
      <template v-for="item in menu">
        <a-menu-item v-if="!item.children" :key="item.pageUrl">
          <MyIcon class="icon" :type="item.icon"></MyIcon>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="item.key">
          <template #title>
            <span style="display:flex;align-items:center;">
              <MyIcon class="icon" :type="item.icon"></MyIcon>
              <span>{{ item.title }}</span>
            </span>
          </template>
          <a-menu-item v-for="i in item.children" :key="i.pageUrl">{{
            i.title
          }}</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { menu } from "./menu";
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    //当前展开Menu的path
    const openKeys = ref<string[]>([
      "/icon",
      "/table",
      "/error"
    ]);
    const router = useRouter();
    const clickMenu = ({ item, key, keyPath }: any) => {
      router.push(keyPath[1]);
    };
    return {
      menu,
      clickMenu,
      openKeys,
    };
  },
});
</script>
<style scoped>
.icon {
  font-size: 20px;
  color: white;
}

</style>
