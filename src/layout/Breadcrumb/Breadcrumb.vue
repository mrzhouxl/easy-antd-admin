<template>
  <a-card style="width: 100%;">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
        <router-link tag="span" :to="item.path">{{
          item.meta.title
        }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <span class="tip">
      <span>{{ tip }}</span>
    </span>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    let tip = ref<string>("");
    onBeforeRouteUpdate((to) => {
      tip.value = to.meta.title as string;
    });
    onMounted(() => {
      tip.value = route.matched.pop()?.meta.title as string;
    });
    return {
      tip,
    };
  },
});
</script>

<style scoped>
.breadcrumb {
  margin-bottom: 8px;
}
.tip {
  margin: 10px 0;
  margin-top: 10px;
  margin-bottom: 0;
  padding-right: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
}
</style>
