<template>
  <div id="app">
    <componentA></componentA>
    <componentB></componentB>
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
  created() {
    setTimeout(() => {
      const path =
        "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-editor-file/examples/vue3/src/components/componentA.vue";
      fetch(`http://localhost:8080/__open-in-editors?file=${path}`);
      console.log("跳转页面");
    }, 2000);
  },
};
</script>

<style></style>
