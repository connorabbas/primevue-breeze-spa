<script setup>
defineProps({
    errors: {
        type: Array,
    },
});
</script>

<template>
    <div v-if="errors" class="space-y-1">
        <Message
            v-for="errorMessage in errors"
            severity="error"
            variant="simple"
            size="small"
        >
            {{ errorMessage }}
        </Message>
    </div>
</template>
