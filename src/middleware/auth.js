export default async function auth(context) {
    const { to, from, authStore } = context;
    console.log('auth middleware');
    if (!authStore.user) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
}
