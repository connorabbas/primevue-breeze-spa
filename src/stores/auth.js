import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from '@/utilities/axios';
import progress from '@/utilities/progress';
import apiRoutes from '@/modules/api-routes';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);

    // Getters
    // const foo = computed(() => 'bar');

    // Actions
    function getUser() {
        return axios
            .get(apiRoutes.user)
            .then((response) => {
                user.value = response.data;
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    user.value = null;
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
