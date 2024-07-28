import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import progress from '@/utilities/progress';
import authRoutes from './auth';
import webRoutes from './web';

const basePath = import.meta.env.VITE_BASE_ROUTE_PATH ?? '/';
const router = createRouter({
    history: createWebHistory(basePath),
    base: basePath,
    routes: [
        ...authRoutes,
        ...webRoutes,
        {
            path: '/:pathMatch(.*)*', // 404 route not found
            name: 'NotFound',
            component: () => import('@/views/NotFound.vue'),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    progress.start();
    const authStore = useAuthStore();

    // Session status message
    authStore.statusMessage = null;

    // Early return for routes that don't require authentication checks
    // Note: Will need to call authStore.getUser() on views/routes that need to check/use the authStore.user
    if (!to.meta.requiresAuth && !to.meta.guestOnly) {
        next();
        return;
    }

    // Check valid user/session
    await authStore.getUser();

    // Auth checks
    /* if (
        to.meta.requiresAuth &&
        to.meta.verifiedAuth &&
        authStore.mustVerifyEmail &&
        authStore.user.email_verified_at === null
    ) {
        if (to.name !== 'verifyEmail') {
            next({ name: 'verifyEmail' });
        } else {
            next();
        }
        return;
    } */
    if (to.meta.requiresAuth && !authStore.user) {
        next({ name: 'login', query: { redirect: to.fullPath } });
        return;
    }
    if (to.meta.guestOnly && authStore.user) {
        next({ name: 'dashboard' });
        return;
    }

    next();
});

router.afterEach(() => {
    progress.done();
});

export default router;
