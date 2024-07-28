<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Container from '@/components/Container.vue';
import MobileNavLink from '@/components/MobileNavLink.vue';
import NavLink from '@/components/NavLink.vue';
import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const route = useRoute();
const currentRouteName = computed(() => route.name);

// User menu (desktop)
const userMenu = ref();
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
    userMenu.value.toggle(event);
};

// Mobile menu (Drawer)
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
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <RouterLink to="/">
                                    <ApplicationLogo
                                        class="block h-10 w-auto fill-current text-surface-900 dark:text-surface-0"
                                    />
                                </RouterLink>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 md:-my-px md:ms-10 md:flex">
                                <NavLink
                                    href="/dashboard"
                                    :active="currentRouteName == 'dashboard'"
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden md:flex md:items-center md:ms-6">
                            <ToggleThemeButton
                                text
                                severity="secondary"
                                rounded
                            />
                            <!-- User Dropdown Menu -->
                            <div class="ms-3 relative">
                                <Menu
                                    :model="userMenuItems"
                                    popup
                                    ref="userMenu"
                                    class="shadow"
                                >
                                    <template #item="{ item, props }">
                                        <RouterLink
                                            v-if="item.route"
                                            v-slot="{ href, navigate }"
                                            :to="item.route"
                                            custom
                                        >
                                            <a
                                                :href="href"
                                                v-bind="props.action"
                                                @click="navigate"
                                            >
                                                <span :class="item.icon" />
                                                <span class="ml-2">{{ item.label }}</span>
                                            </a>
                                        </RouterLink>
                                        <a
                                            v-else
                                            :href="item.url"
                                            :target="item.target"
                                            v-bind="props.action"
                                        >
                                            <span :class="item.icon" />
                                            <span class="ml-2">{{ item.label }}</span>
                                        </a>
                                    </template>
                                </Menu>
                                <Button
                                    text
                                    severity="secondary"
                                    @click="toggleUserMenu($event)"
                                >
                                    <span>{{ authStore?.user?.name }}</span>
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
                    </div>
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
                        <ul class="list-none p-0 m-0 overflow-hidden">
                            <li>
                                <MobileNavLink href="/dashboard">
                                    <i class="pi pi-home mr-2"></i>
                                    <span class="font-medium">Dashboard</span>
                                </MobileNavLink>
                            </li>
                        </ul>
                        <!-- Use PanelMenu for nested Links/Actions as needed-->
                        <!-- https://primevue.org/panelmenu/#router -->
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
