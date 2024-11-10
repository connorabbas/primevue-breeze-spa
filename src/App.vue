<script setup>
import { RouterView } from "vue-router";
</script>

<template>
    <!-- Use key to re-generate the page view component on each navigation :key="$route.path" -->
    <!-- Alteratively, use a watch() on each component to re-render dynamic data as needed -->
    <Toast position="top-center" />
    <Suspense>
        <RouterView />
    </Suspense>
</template>
