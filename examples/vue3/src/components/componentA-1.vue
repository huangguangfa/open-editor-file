<template>
  <div class="componentA-1">
    A-1组件
    <componentA11 v-show="show"></componentA11>
    <button @click="show = !show">显示com11</button>
  </div>
</template>
<script>
import componentA11 from "./componentA-1-1.vue";
export default {
  components: {
    componentA11,
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
<style>
.componentA-1 {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  margin: 0 5px;
}
</style>
