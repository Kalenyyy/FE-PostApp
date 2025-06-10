<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>

  <ToastMessage ref="toastRef" />
</template>

<script setup>
import DefaultLayout from "./layouts/DefaultLayout.vue";
</script>
