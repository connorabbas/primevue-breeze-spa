<script setup>
const props = defineProps({
    href: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <RouterLink
        :to="href"
        class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium leading-5 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300 hover:border-surface-300 dark:hover:border-surface-700 focus:outline-none focus:text-surface-700 dark:focus:text-surface-300 focus:border-surface-300 dark:focus:border-surface-700 transition duration-150 ease-in-out"
        activeClass="border-primary-400 !dark:border-primary-600 focus:border-primary-700 text-surface-900 !dark:text-surface-100"
    >
        <slot />
    </RouterLink>
</template>
