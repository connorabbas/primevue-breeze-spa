export default async function (context) {
    const { authStore } = context;
    await authStore.getUser();

    if (authStore.user) {
        return { name: 'dashboard' };
    }
};