export default async function verified({ to, from, authStore }) {
    if (authStore.mustVerifyEmail && authStore.user && authStore.user.email_verified_at === null) {
        if (to.name !== 'verifyEmail') {
            return { name: 'verifyEmail' };
        }
    }
}
