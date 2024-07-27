const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/password-reset/:token',
        name: 'passwordReset',
        component: () => import('@/views/auth/ResetPassword.vue'),
        props: true,
        meta: { guestOnly: true },
    },
];

export default authRoutes;
