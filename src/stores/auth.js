import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import router from '@/router';
import axios from '@/utils/axios';
import progress from '@/utils/progress';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();
    const { setFlashMessage } = useFlashMessage();

    const mustVerifyEmail = false;

    const user = useStorage('authenticatedUser', null); // user persisted in case page is reloaded

    function getUserError() {
        user.value = null;
        toast.removeAllGroups(); // prevent multiple of the same toast from popping up
        toast.add({
            severity: 'error',
            summary: 'Authentication Error',
            detail: 'Unable to reach the authentication server, please try again later.',
            life: 3000,
        });
    }
    function getUser() {
        return axios
            .get('/api/user')
            .then((response) => {
                if (response.status === 200) {
                    user.value = response.data;
                } else {
                    getUserError();
                }
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    // endpoint is fine, user is unauthorized
                    user.value = null;
                } else {
                    getUserError();
                }
            });
    }
    function getCsrfCookie() {
        return axios.get('/sanctum/csrf-cookie');
    }
    function sendVerificationEmail() {
        return axios.post('/email/verification-notification').then((response) => {
            setFlashMessage('success', response.data.status);
        });
    }
    function logout() {
        progress.start();
        return axios
            .post('/logout')
            .then((response) => {
                user.value = null;
                router.push({ name: 'welcome' });
            })
            .finally(() => {
                progress.done();
            });
    }

    return {
        mustVerifyEmail,
        user,
        getUser,
        getCsrfCookie,
        sendVerificationEmail,
        logout,
    };
});
