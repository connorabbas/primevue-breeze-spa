export default async function (context) {
    const { to, authStore } = context;
    await authStore.getUser();

    if (!authStore.user) {
        return {
            next: { name: 'login', query: { redirect: to.fullPath } },
        };
    }
}
