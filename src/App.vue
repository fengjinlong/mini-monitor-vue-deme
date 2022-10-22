<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Img404 from "./components/Img404.vue";
import PromiseReject from "./components/PromiseReject.vue";
import AxiosErr from "./components/axiosErr.vue";
import SetTimeou from "./components/setTimeou.vue";
setTimeout(() => {
  // console.log("setTimeout", qq);
});
</script>

<template>
  <HelloWorld />
  <Img404 />
  <PromiseReject />
  <AxiosErr />
  <SetTimeou />
</template>

<style scoped></style>
