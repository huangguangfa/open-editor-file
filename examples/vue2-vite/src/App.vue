<template>
  <div id="app">
    <componentA></componentA>
    <componentB v-if="show"></componentB>
  </div>
</template>

<script>
import componentA from "./components/componentA.vue";
import componentB from "./components/componentB.vue";
export default {
  name: "App",
  components: {
    componentA,
    componentB,
  },
  data() {
    return {
      show: true,
    };
  },
  created() {},
};
</script>
