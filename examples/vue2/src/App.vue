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
    componentB
  },
  created() {
    setTimeout(() => {
      const path =
        "/Users/guangfa/Desktop/guangfaMac/guangfa/gfCode/open-vscode-file/examples/vue3/src/components/componentA.vue";
      fetch(`http://localhost:8080/?file=${path}`);
    }, 2000);
  }
};
</script>

<style></style>
