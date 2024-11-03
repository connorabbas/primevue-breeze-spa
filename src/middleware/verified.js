export default async function verified({ to, from, authStore }) {
    if (
        authStore.mustVerifyEmail &&
        new Boolean(authStore.user?.id) &&
        authStore.user.email_verified_at === null
    ) {
        if (to.name !== 'verifyEmail') {
            return { name: 'verifyEmail' };
        }
    }
}
