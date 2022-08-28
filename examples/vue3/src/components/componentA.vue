<template>
  <div class="componentA">
    A组件
    <componentsA1 style="width: 100px; height: 100px"></componentsA1>
  </div>
</template>

<script>
import componentsA1 from "./componentA-1.vue";
export default {
  components: {
    componentsA1,
  },
};
</script>

<style>
.componentA {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 5px;
}
</style>
