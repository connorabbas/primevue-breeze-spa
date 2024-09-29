export default async function (context) {
    const { authStore } = context;

    if (authStore.user) {
        await authStore.getUser();
    }
}
