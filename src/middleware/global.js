export default async function global(context) {
    const { to, from, authStore } = context;
    if (authStore.user) {
        await authStore.fetchUser();
    }
}
