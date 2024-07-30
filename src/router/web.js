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
        meta: { middleware: ['auth', 'verified'] },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Edit.vue'),
        meta: { middleware: ['auth'] },
    },
];

export default webRoutes;
