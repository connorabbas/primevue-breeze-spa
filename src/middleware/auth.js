export default function (context) {
    const { to, authStore } = context;

    if (!authStore.user) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
}
