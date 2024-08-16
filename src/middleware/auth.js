export default async function (context) {
    const { to, authStore } = context;
    await authStore.getUser();

    if (!authStore.user) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
}
