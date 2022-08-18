<template>
  <componentA></componentA>
  <componentB></componentB>

  <RouterView />
</template>

<script lang="ts" setup>
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
import { RouterLink, RouterView } from "vue-router";

setTimeout(() => {
  const path =
    "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-vscode-file/examples/vue3/src/components/componentA.vue";
  fetch(`http://localhost:5173/?file=${path}`);
}, 2000);
</script>
