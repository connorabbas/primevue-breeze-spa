import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import progress from '@/utils/progress';
import authRoutes from './auth';
import webRoutes from './web';
import globalMiddleware from '@/middleware/global';

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
    console.log(authStore.user);
    //await authStore.fetchUser();

    // Run middleware pipeline
    const routeMiddleware = to.meta.middleware || [];
    const middlewares = [globalMiddleware, ...routeMiddleware];
    if (middlewares.length > 0) {
        for (let i = 0; i < middlewares.length; i++) {
            return await middlewares[i](context);
        }
    }
});

router.afterEach(() => {
    progress.done();
});

export default router;
