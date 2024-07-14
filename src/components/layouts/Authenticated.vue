<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted, onUnmounted, watchEffect, computed } from "vue";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import Button from "primevue/button";

const authStore = useAuthStore();

const mainMenuItems = [
    {
        label: "Home",
        route: { name: "home" },
    },
    {
        label: "Dashboard",
        route: { name: "dashboard" },
    },
];
const userMenuItems = [
    {
        label: "Profile",
        route: { name: "profile" },
        icon: "pi pi-fw pi-user",
    },
    {
        label: "Log Out",
        callFunction: () => authStore.logout(),
        icon: "pi pi-fw pi-sign-out",
    },
];
const mobileMenuItems = [
    {
        label: "Dashboard",
        route: { name: "dashboard" },
        icon: "pi pi-fw pi-home",
    },
    {
        label: "Profile",
        route: { name: "profile" },
        icon: "pi pi-fw pi-user",
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
    window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
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
        <header>
            
        </header>
        <main>
            <slot name="header" />
            <slot />
        </main>
    </div>
</template>
