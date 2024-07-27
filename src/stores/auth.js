import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from '@/utilities/axios';
import progress from '@/utilities/progress';
import apiRoutes from '@/modules/api-routes';
import { useToast } from 'primevue/usetoast';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();

    const user = ref(null);

    function authError() {
        user.value = null;
        toast.removeAllGroups(); // prevent multiple of the same toast from popping up
        toast.add({
            severity: 'error',
            summary: 'Authentication Error',
            detail: 'An unexpected error occurred, please try again later.',
            life: 3000,
        });
    }
    function getUser() {
        return axios
            .get(apiRoutes.user)
            .then((response) => {
                if (
                    response.status >= 200 &&
                    response.status < 300 &&
                    response.data?.id &&
                    response.data?.name &&
                    response.data?.email
                ) {
                    user.value = response.data;
                } else {
                    authError();
                }
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    // endpoint is fine, user is unauthorized
                    user.value = null;
                } else {
                    authError();
                }
            });
    }
    function getCsrfCookie() {
        return axios.get(apiRoutes.sanctumCsrfCookie);
    }
    function loginRedirect() {
        const redirect = router.currentRoute.value.query.redirect;
        if (redirect) {
            router.push({ path: redirect });
        } else {
            router.push({ name: 'dashboard' });
        }
    }
    function login(formData) {
        progress.start();
        return getCsrfCookie()
            .then(() => {
                return axios.post(apiRoutes.auth.login, formData).then((response) => {
                    loginRedirect();
                });
            })
            .finally(() => {
                progress.done();
            });
    }
    function register(formData) {
        progress.start();
        return getCsrfCookie()
            .then(() => {
                return axios.post(apiRoutes.auth.register, formData).then((response) => {
                    loginRedirect();
                });
            })
            .finally(() => {
                progress.done();
            });
    }
    function logout() {
        progress.start();
        return axios
            .post(apiRoutes.auth.logout)
            .then((response) => {
                user.value = null;
                router.push({ name: 'home' });
            })
            .finally(() => {
                progress.done();
            });
    }

    return {
        user,
        getUser,
        getCsrfCookie,
        loginRedirect,
        login,
        register,
        logout,
    };
});
