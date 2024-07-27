import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import progress from '@/utilities/progress';
import authRoutes from './auth';
import webRoutes from './web';

const basePath = import.meta.env.VITE_BASE_ROUTE_PATH ?? '/';
const router = createRouter({
    history: createWebHistory(basePath),
    base: basePath,
    //linkActiveClass: '',
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

    // Early return for routes that don't require authentication checks
    if (!to.meta.requiresAuth && !to.meta.guestOnly) {
        next();
        return;
    }

    // check valid user/session
    await authStore.getUser();

    // proceed with the regular auth checks
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
