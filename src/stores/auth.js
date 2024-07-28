import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import router from '@/router';
import axios from '@/utilities/axios';
import progress from '@/utilities/progress';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();

    const user = ref(null);
    const statusMessage = ref(null);

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
            .get('/api/user')
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
        return axios.get('/sanctum/csrf-cookie');
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
                return axios.post('/login', formData);
            })
            .finally(() => {
                progress.done();
            });
    }
    function register(formData) {
        progress.start();
        return getCsrfCookie()
            .then(() => {
                return axios.post('/register', formData);
            })
            .finally(() => {
                progress.done();
            });
    }
    function requestPasswordResetLink(formData) {
        progress.start();
        return getCsrfCookie()
            .then(() => {
                return axios.post('/forgot-password', formData);
            })
            .finally(() => {
                progress.done();
            });
    }
    function resetPassword(formData) {
        progress.start();
        return getCsrfCookie()
            .then(() => {
                return axios.post('/reset-password', formData);
            })
            .finally(() => {
                progress.done();
            });
    }
    function sendVerificationEmail() {
        return axios.post('/email/verification-notification');
    }
    function logout() {
        progress.start();
        return axios
            .post('/logout')
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
        statusMessage,
        getUser,
        getCsrfCookie,
        loginRedirect,
        requestPasswordResetLink,
        resetPassword,
        sendVerificationEmail,
        login,
        register,
        logout,
    };
});
