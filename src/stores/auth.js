import { defineStore } from 'pinia';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import { useErrorHandling } from '@/composables/useErrorHandling';
import router from '@/router';
import axios from '@/utils/axios';
import progress from '@/utils/progress';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
    const { setFlashMessage } = useFlashMessage();
    const { handleAxiosError } = useErrorHandling();

    const mustVerifyEmail = false;

    const user = useStorage('authenticatedUser', null); // user persisted in case page is reloaded

    function getUser() {
        return axios
            .get('/api/user')
            .then((response) => {
                if (response.status === 200) {
                    user.value = response.data;
                }
            })
            .catch((error) => handleAxiosError(error));
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
