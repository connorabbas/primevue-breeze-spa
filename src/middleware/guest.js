export default async function guest(context) {
    const { to, from, authStore } = context;
    if (authStore.user) {
        return { name: 'dashboard' };
    }
}
