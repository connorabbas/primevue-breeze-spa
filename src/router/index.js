import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import progress from '@/utils/progress';
import authRoutes from './auth';
import webRoutes from './web';

const basePath = import.meta.env.VITE_BASE_PATH ?? '/';
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

router.beforeEach(async (to, from) => {
    progress.start();

    // Early return check
    if (!to?.meta?.middleware || !Array.isArray(to?.meta?.middleware)) {
        return;
    }

    // Context for middleware functions
    const authStore = useAuthStore();
    const context = { to, from, authStore };

    // Get user
    await authStore.fetchUser();

    // Run middleware pipeline
    const routeMiddleware = to.meta.middleware || [];
    if (routeMiddleware.length > 0) {
        for (const middlewareResult of routeMiddleware) {
            return await middlewareResult(context);
        }
    }
});

router.afterEach(() => {
    progress.done();
});

export default router;
