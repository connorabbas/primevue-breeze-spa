import HomeView from '../views/Home.vue';

const webRoutes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Edit.vue'),
        meta: { requiresAuth: true },
    },
];

export default webRoutes;
