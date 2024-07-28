const webRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true, verifiedAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Edit.vue'),
        meta: { requiresAuth: true },
    },
];

export default webRoutes;
