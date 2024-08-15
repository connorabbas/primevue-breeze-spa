export default async function (context) {
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