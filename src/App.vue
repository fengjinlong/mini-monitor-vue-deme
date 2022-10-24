<script setup>
import { getIndicators } from "./request/api";
import HelloWorld from "./components/HelloWorld.vue";
import Img404 from "./components/Img404.vue";
import PromiseReject from "./components/PromiseReject.vue";
import AxiosErr from "./components/axiosErr.vue";
import Btn from "./components/btn.vue";
import SetTimeou from "./components/setTimeou.vue";
setTimeout(() => {
  // console.log("setTimeout", qq);
});

const setCssVar = (prop, val, dom = document.documentElement) => {
  dom.style.setProperty(prop, val);
};
const b = () => {
  setCssVar("--theme-color", "red");
  setCssVar("--theme-background", "#fff");
};
const d = () => {
  setCssVar("--theme-color", "#fff");
  setCssVar("--theme-background", "black");
};
const getIndicatorsBtn = () => {
  getIndicators().then((res) => console.log("res", res));
};
</script>

<template>
  <div class="gbg">
    <button @click="b">白纸红字</button>
    <button @click="d">黑纸白字</button>
    <HelloWorld />
    <Img404 />
    <PromiseReject />
    <AxiosErr />
    <SetTimeou />
    <!-- 改变 UI 组件库 -->
    <button @click="getIndicatorsBtn">getIndicators</button>
    <Btn />
  </div>
</template>

<style scoped>
.gbg {
  background: var(--theme-background);
}
</style>
