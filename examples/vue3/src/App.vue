<template>
  <h1>vue3</h1>
  <componentA></componentA>
  <componentB style="width: 100px; height: 100px"></componentB>
  <componentC></componentC>
  <!-- <RouterView /> -->
</template>

<script lang="ts" setup>
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
import componentC from "./components/componentC.vue";
import { ref } from "vue";

const show = ref(true);

// setTimeout(() => {
//   show.value = false;
// }, 5000);

// setTimeout(() => {
//   const path =
//     "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-editor-file/examples/vue3/src/components/componentA.vue";
//   fetch(`http://localhost:5173/__open-in-editors?file=${path}`);
// }, 2000);
</script>
