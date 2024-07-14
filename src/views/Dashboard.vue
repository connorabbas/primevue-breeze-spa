<script setup>
import AuthLayout from "@/components/layouts/Authenticated.vue";
</script>

<template>
    <AuthLayout>
        <template #header>
            <div class="surface-overlay py-4 shadow-1">
                <OuterLayoutContainer>
                    <h2 class="m-0">Dashboard</h2>
                </OuterLayoutContainer>
            </div>
        </template>
        <div class="my-6 surface-overlay p-5 shadow-1 border-noround sm:border-round-lg">
            <div>
                <p class="m-0">You are logged in!</p>
            </div>
        </div>
    </AuthLayout>
</template>
