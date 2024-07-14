<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Container from '@/components/Container.vue';
import MobileNavLink from '@/components/MobileNavLink.vue';
import NavLink from '@/components/NavLink.vue';
import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const mainMenuItems = [
    {
        label: 'Home',
        route: { name: 'home' },
    },
    {
        label: 'Dashboard',
        route: { name: 'dashboard' },
    },
];
const userMenuItems = [
    {
        label: 'Profile',
        route: { name: 'profile' },
        icon: 'pi pi-fw pi-user',
    },
    {
        label: 'Log Out',
        callFunction: () => authStore.logout(),
        icon: 'pi pi-fw pi-sign-out',
    },
];
const mobileMenuItems = [
    {
        label: 'Dashboard',
        route: { name: 'dashboard' },
        icon: 'pi pi-fw pi-home',
    },
    {
        label: 'Profile',
        route: { name: 'profile' },
        icon: 'pi pi-fw pi-user',
    },
    /* {
        label: "Log Out",
        callFunction: () => logout(),
        icon: "pi pi-fw pi-sign-out",
    }, */
];

const menu = ref(null);
const mobileMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

function toggleUserMenu(event) {
    menu.value.toggle(event);
}
const updateWidth = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', updateWidth);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
// Watch for windowWidth changes to close sidebar on larger screens if it was opened on mobile
watchEffect(() => {
    if (windowWidth.value > 992) {
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
                                        <!-- <Link
                                            :href="item.href"
                                            :method="item.method === 'post' ? 'post' : 'get'"
                                            :as="item.method === 'post' ? 'li' : 'a'"
                                            class="p-menu-item-link"
                                            :class="{
                                                'flex items-center w-full text-left': item.method === 'post',
                                            }"
                                            custom
                                        >
                                            <span
                                                v-show="item.icon"
                                                :class="[item.icon]"
                                            />
                                            <span>{{ item.label }}</span>
                                        </Link> -->
                                    </template>
                                </Menu>
                                <Button
                                    text
                                    severity="secondary"
                                    @click="toggleUserMenu($event)"
                                >
                                    <span class="">User Name</span>
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
                                <MobileNavLink
                                    href="/dashboard"
                                >
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
                            <RouterLink
                                to=""
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
                            <RouterLink
                                to=""
                                class="flex-auto"
                            >
                                <Button
                                    label="Logout"
                                    icon="pi pi-sign-out"
                                    class="w-full"
                                    severity="danger"
                                    text
                                ></Button>
                            </RouterLink>
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
