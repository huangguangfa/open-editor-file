<template>
  <h1>vue3</h1>
  <componentA></componentA>
  <componentB></componentB>

  <RouterView />
</template>

<script lang="ts" setup>
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
import { RouterLink, RouterView } from "vue-router";

// setTimeout(() => {
//   const path =
//     "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-editor-file/examples/vue3/src/components/componentA.vue";
//   fetch(`http://localhost:5173/__open-in-editors?file=${path}`);
// }, 2000);
</script>
