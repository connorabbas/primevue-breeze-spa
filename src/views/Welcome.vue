<script setup>
import ResponsiveCard from '@/components/ResponsiveCard.vue';
import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <main>
        <div class="h-screen flex items-center justify-center">
            <ResponsiveCard spacing-classes="p-4 py-6 sm:p-12">
                <div class="text-center md:text-left">
                    <section>
                        <span class="block text-6xl font-bold mb-1">Laravel Breeze</span>
                        <div class="text-6xl text-primary font-bold mb-4"> & PrimeVue</div>
                        <p class="mt-0 mb-2 text-muted-color leading-normal">
                            A starter kit for using
                            <a
                                href="https://laravel.com/docs/master/starter-kits#laravel-breeze"
                                class="underline text-primary hover:text-color"
                                >Laravel Breeze</a
                            >
                            authentication with the API stack
                        </p>
                        <p class="mt-0 mb-6 text-muted-color leading-normal">
                            Utilizing
                            <a
                                href="https://primevue.org/"
                                class="underline text-primary hover:text-color"
                                >PrimeVue</a
                            >
                            components in a basic SPA
                        </p>
                        <template v-if="authStore?.user">
                            <RouterLink :to="{ name: 'dashboard' }">
                                <Button
                                    raised
                                    label="Dashboard"
                                    icon="pi pi-th-large"
                                    class="mr-4"
                                />
                            </RouterLink>
                            <RouterLink :to="{ name: 'profile' }">
                                <Button
                                    outlined
                                    label="Profile"
                                    icon="pi pi-user"
                                    class="mr-4"
                                />
                            </RouterLink>
                        </template>
                        <template v-else>
                            <RouterLink :to="{ name: 'login' }">
                                <Button
                                    raised
                                    label="Login"
                                    icon="pi pi-sign-in"
                                    class="mr-4"
                                />
                            </RouterLink>
                            <RouterLink :to="{ name: 'register' }">
                                <Button
                                    outlined
                                    label="Register"
                                    icon="pi pi-user-plus"
                                    class="mr-4"
                                />
                            </RouterLink>
                        </template>
                        <ToggleThemeButton outlined />
                    </section>
                </div>
            </ResponsiveCard>
        </div>
    </main>
</template>
