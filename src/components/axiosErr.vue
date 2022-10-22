<script setup>
import { findAll, del, add } from "../request/api";
const getAll = () => {
  findAll({}).then((arr) => {
    console.log("axios", arr);
  });
};
const delAll = () => {
  del({ a: 1 }).then((res) => {
    // console.log(res);
  });
};
const addItem = () => {
  add({ id: 333, sendEmail: true });
};
</script>

<template>
  <p>axios</p>
  <button @click="addItem">addItem</button>
  <button @click="getAll" style="border: 2px solid yellow">getAll</button>
  <button @click="delAll" style="border: 2px solid green">delAll</button>
</template>
