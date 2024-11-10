export default async function guest({ to, from, authStore }) {
    if (!authStore.user) {
        await authStore.fetchUser();
    }
    if (authStore.user) {
        return { name: 'dashboard' };
    }
}
