<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import Container from '@/components/Container.vue';
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl leading-tight">Dashboard</h2>
        </template>
        <Container>
            <div class="py-12">
                <Card>
                    <template #content>
                        <p class="m-0">You are logged in!</p>
                    </template>
                </Card>
            </div>
        </Container>
    </AuthenticatedLayout>
</template>
