<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from '@/utils/axios';
import { useToast } from 'primevue/usetoast';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import router from '@/router';
import GuestLayout from '@/layouts/GuestLayout.vue';
import InputErrors from '@/components/InputErrors.vue';

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors } = useErrorHandling();
const { setFlashMessage } = useFlashMessage();

const emailInput = ref();

const form = reactive({
    processing: false,
    data: {
        token: props.token,
        email: route.query?.email ?? '',
        password: '',
        password_confirmation: '',
    },
});

const submit = () => {
    form.processing = true;
    authStore
        .getCsrfCookie()
        .then(() => {
            return axios.post('/reset-password', form.data);
        })
        .then((response) => {
            clearErrors();
            router.push({ name: 'login' }).then(() => {
                setFlashMessage('success', response.data.status);
            });
        })
        .catch((error) => {
            handleAxiosError(error);
            if (errors.critical || errors.other) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An unexpected error occurred, please try again later.',
                    life: 3000,
                });
            }
        })
        .finally(() => {
            form.processing = false;
        });
};

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div class="mb-6">
                <label
                    for="email"
                    class="block mb-2"
                    >Email</label
                >
                <InputText
                    required
                    ref="emailInput"
                    id="email"
                    type="email"
                    v-model="form.data.email"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.email)"
                    autocomplete="username"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.email"
                />
            </div>

            <div class="mb-6">
                <label
                    for="password"
                    class="block mb-2"
                    >New Password</label
                >
                <InputText
                    id="password"
                    type="password"
                    v-model="form.data.password"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password)"
                    required
                    autocomplete="new-password"
                />
                <InputErrors
                    class="mt-2 mb-1"
                    :errors="errors.validation?.password"
                />
            </div>

            <div class="mb-6">
                <label
                    for="password_confirmation"
                    class="block mb-2"
                    >Confirm New Password</label
                >
                <InputText
                    id="password_confirmation"
                    type="password"
                    v-model="form.data.password_confirmation"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password_confirmation)"
                    required
                    autocomplete="new-password"
                />
                <InputErrors
                    class="mt-2 mb-1"
                    :errors="errors.validation?.password_confirmation"
                />
            </div>

            <div class="flex justify-end items-center">
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Reset Password"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
