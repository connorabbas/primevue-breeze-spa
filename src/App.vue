<script setup>
import { RouterView } from "vue-router";
import Toast from 'primevue/toast';
</script>

<template>
    <!-- Use key to re-generate the page view component on each navigation :key="$route.path" -->
    <!-- Alteratively, use a watch() on each component to re-render dynamic data as needed -->
    <Toast />
    <RouterView />
</template>
