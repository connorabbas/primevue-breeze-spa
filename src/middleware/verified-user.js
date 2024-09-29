export default function (context) {
    const { to, authStore } = context;

    if (authStore.mustVerifyEmail && authStore.user && authStore.user.email_verified_at === null) {
        if (to.name !== 'verifyEmail') {
            return { name: 'verifyEmail' };
        }
    }
};