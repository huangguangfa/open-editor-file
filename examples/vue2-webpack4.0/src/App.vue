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
  created() {
    setTimeout(() => {
      this.show = false;
    }, 5000);
    // setTimeout(() => {
    //   const path =
    //     "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-editor-file/examples/vue3/src/components/componentA.vue";
    //   fetch(`/__open-in-editors?file=${path}`);
    //   console.log("跳转页面");
    // }, 2000);
  },
};
</script>
