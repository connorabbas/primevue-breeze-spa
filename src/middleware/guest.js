export default async function guest({ to, from, authStore }) {
    if (authStore.user) {
        return { name: 'dashboard' };
    }
}
