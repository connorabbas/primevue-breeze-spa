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

    // Fetch user if authenticated
    const authStore = useAuthStore();
    if (authStore.user) {
        await authStore.fetchUser();
    }

    // Run middleware pipeline
    const context = { to, from, authStore };
    const routeMiddleware = to.meta.middleware || [];
    for (const middleware of routeMiddleware) {
        const result = await middleware(context);
        if (result) {
            return result; // Exit and redirect if middleware returns a route
        }
    }
});

router.afterEach(() => {
    progress.done();
});

export default router;
