<template>
  <h1>vue3</h1>
  <componentA></componentA>
  <componentB style="width: 100px; height: 100px"></componentB>
  <componentC></componentC>
  <componentD></componentD>
  <Home></Home>
</template>

<script lang="ts" setup>
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
import componentC from "./components/componentC.vue";
import componentD from "./components/componentD.vue";
import Home from "./components/home/index.vue";
</script>
