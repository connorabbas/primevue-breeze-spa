export default async function verified(context) {
    const { to, from, authStore } = context;
    if (authStore.mustVerifyEmail && authStore.user && authStore.user.email_verified_at === null) {
        if (to.name !== 'verifyEmail') {
            return { name: 'verifyEmail' };
        }
    }
}
