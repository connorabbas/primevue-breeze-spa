export default async function auth({ to, from, authStore }) {
    if (!authStore.user) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
}
