import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import authRoutes from './auth';
import webRoutes from './web';

const basePath = import.meta.env.VITE_BASE_ROUTE_PATH;
const router = createRouter({
    history: createWebHistory(basePath),
    base: basePath,
    linkActiveClass: 'text-primary',
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
    NProgress.start();
    const authStore = useAuthStore();

    // Early return for routes that don't require authentication checks
    if (!to.meta.requiresAuth && !to.meta.requiresUnAuth) {
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
    if (to.meta.requiresUnAuth && authStore.user) {
        next({ name: 'dashboard' });
        return;
    }

    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
