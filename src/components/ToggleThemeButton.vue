<script setup>
import { useTheme } from '@/composables/useTheme.js';

const { currentTheme, setTheme } = useTheme();

function toggleTheme() {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}
</script>

<template>
    <Button
        title="Change theme"
        :icon="currentTheme === 'light' ? 'pi pi-sun' : 'pi pi-moon'"
        @click="toggleTheme"
    />
</template>
