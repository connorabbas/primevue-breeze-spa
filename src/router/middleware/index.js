export const authenticatedMiddleware = async (context) => {
    const { to, authStore } = context;
    await authStore.getUser();

    if (!authStore.user) {
        return {
            next: { name: 'login', query: { redirect: to.fullPath } },
        };
    }
};

export const guestMiddleware = async (context) => {
    const { authStore } = context;
    await authStore.getUser();

    if (authStore.user) {
        return {
            next: { name: 'dashboard' },
        };
    }
};

export const verifiedUserMiddleware = async (context) => {
    const { to, authStore } = context;
    await authStore.getUser();

    if (authStore.mustVerifyEmail && authStore.user && authStore.user.email_verified_at === null) {
        if (to.name !== 'verifyEmail') {
            return {
                next: { name: 'verifyEmail' },
            };
        }
    }
};
