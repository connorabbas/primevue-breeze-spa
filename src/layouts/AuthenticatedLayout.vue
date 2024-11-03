<script setup>
import { ref, useTemplateRef, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Container from '@/components/Container.vue';
import LinksMenu from '@/components/PrimeVue/LinksMenu.vue';
import LinksMenuBar from '@/components/PrimeVue/LinksMenuBar.vue';
import LinksPanelMenu from '@/components/PrimeVue/LinksPanelMenu.vue';
import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const currentRouteName = computed(() => route.name);

// Main menu
const mainMenuItems = [
    {
        label: 'Dashboard',
        route: { name: 'dashboard' },
        active: currentRouteName.value == 'dashboard',
    },
];

// User menu (desktop)
const userMenu = useTemplateRef('user-menu');
const userMenuItems = [
    {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        route: { name: 'profile' },
    },
    {
        label: 'Log Out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => authStore.logout(),
    },
];
const toggleUserMenu = (event) => {
    userMenu.value.childRef.toggle(event);
};

// Mobile menu (Drawer)
const homeMobileMenuItems = ref([
    {
        label: 'Welcome',
        icon: 'pi pi-home',
        route: { name: 'welcome' },
        active: currentRouteName.value == 'welcome',
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        route: { name: 'dashboard' },
        active: currentRouteName.value == 'dashboard',
    },
]);
const mobileMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);
const updateWidth = () => {
    windowWidth.value = window.innerWidth;
};
onMounted(() => {
    window.addEventListener('resize', updateWidth);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
watchEffect(() => {
    if (windowWidth.value > 768) {
        mobileMenuOpen.value = false;
    }
});
</script>

<template>
    <div>
        <div class="min-h-screen">
            <nav
                class="bg-surface-0 dark:bg-surface-900 border-b"
                :class="
                    $slots.header
                        ? 'border-surface-100 dark:border-surface-800'
                        : 'border-surface-0 dark:border-surface-900 shadow'
                "
            >
                <!-- Primary Navigation Menu -->
                <Container>
                    <LinksMenuBar
                        :model="mainMenuItems"
                        :pt="{
                            root: {
                                class: 'px-0 py-3 border-0 rounded-none bg-surface-0 dark:bg-surface-900',
                            },
                            button: {
                                class: 'hidden',
                            },
                        }"
                    >
                        <template #start>
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center mr-5">
                                <RouterLink to="/">
                                    <ApplicationLogo
                                        class="block h-10 w-auto fill-current text-surface-900 dark:text-surface-0"
                                    />
                                </RouterLink>
                            </div>
                        </template>
                        <template #end>
                            <div class="hidden md:flex md:items-center md:ms-6">
                                <ToggleThemeButton
                                    text
                                    severity="secondary"
                                    rounded
                                />
                                <!-- User Dropdown Menu -->
                                <div class="ms-3 relative">
                                    <LinksMenu
                                        :model="userMenuItems"
                                        popup
                                        ref="user-menu"
                                        class="shadow"
                                    />
                                    <Button
                                        text
                                        size="small"
                                        severity="secondary"
                                        @click="toggleUserMenu($event)"
                                    >
                                        <span class="text-base">{{ authStore?.user?.name }}</span>
                                        <i class="pi pi-angle-down ml-1"></i>
                                    </Button>
                                </div>
                            </div>

                            <!-- Hamburger -->
                            <div class="flex items-center md:hidden">
                                <div class="relative">
                                    <Button
                                        text
                                        rounded
                                        severity="secondary"
                                        icon="pi pi-bars"
                                        @click="mobileMenuOpen = true"
                                    />
                                </div>
                            </div>
                        </template>
                    </LinksMenuBar>
                </Container>

                <!-- Mobile drawer menu -->
                <Drawer
                    v-model:visible="mobileMenuOpen"
                    position="right"
                >
                    <template #header>
                        <ToggleThemeButton
                            text
                            severity="secondary"
                            rounded
                        />
                    </template>
                    <div>
                        <div class="mb-5">
                            <p class="text-muted-color font-bold uppercase text-sm mb-2"> Home </p>
                            <LinksPanelMenu
                                :model="homeMobileMenuItems"
                                class="w-full"
                            />
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex items-center gap-2">
                            <div class="grow">
                                <RouterLink
                                    :to="{ name: 'profile' }"
                                    class="flex-auto"
                                >
                                    <Button
                                        label="Profile"
                                        icon="pi pi-user"
                                        class="w-full"
                                        severity="secondary"
                                        outlined
                                    ></Button>
                                </RouterLink>
                            </div>
                            <div class="grow">
                                <Button
                                    @click="authStore.logout()"
                                    label="Logout"
                                    icon="pi pi-sign-out"
                                    class="w-full"
                                    severity="danger"
                                    text
                                ></Button>
                            </div>
                        </div>
                    </template>
                </Drawer>
            </nav>

            <!-- Page Heading -->
            <header
                class="bg-surface-0 dark:bg-surface-900 shadow"
                v-if="$slots.header"
            >
                <Container>
                    <div class="py-6">
                        <slot name="header" />
                    </div>
                </Container>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
