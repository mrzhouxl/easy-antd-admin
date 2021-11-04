<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { get } from "./util/http";
import { useStore} from 'vuex'
export default defineComponent({
  name: "App",
  components: {},
});
</script>
<style>
  #app{
    height: 100%;
  }
</style>
