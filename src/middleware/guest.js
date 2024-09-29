export default function (context) {
    const { authStore } = context;

    if (authStore.user) {
        return { name: 'dashboard' };
    }
};