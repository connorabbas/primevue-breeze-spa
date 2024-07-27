<script setup>
import ResponsiveCard from '@/components/ResponsiveCard.vue';
</script>

<template>
    <main>
        <div class="h-screen flex items-center justify-center">
            <ResponsiveCard spacing-classes="p-4 py-6 sm:p-12">
                <div class="text-center">
                    <section>
                        <h2 class="mb-8 font-extrabold text-9xl"> <span class="sr-only">Error</span>404 </h2>
                        <p class="mb-8 text-2xl font-semibold md:text-3xl text-muted-color"
                            >Sorry, we couldn't find this page.</p
                        >
                        <RouterLink :to="{ name: 'home' }">
                            <Button
                                raised
                                label="Back to homepage"
                                icon="pi pi-arrow-left"
                            />
                        </RouterLink>
                    </section>
                </div>
            </ResponsiveCard>
        </div>
    </main>
</template>
