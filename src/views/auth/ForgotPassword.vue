<script setup>
import { useTemplateRef, reactive, onMounted } from 'vue';
import axios from '@/utils/axios';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import Message from 'primevue/message';
import GuestLayout from '@/layouts/GuestLayout.vue';
import InputErrors from '@/components/InputErrors.vue';

const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors } = useErrorHandling();
const { flashMessages, setFlashMessage } = useFlashMessage();

const emailInput = useTemplateRef('email-input');

const form = reactive({
    processing: false,
    data: {
        email: '',
    },
});

const submit = () => {
    form.processing = true;
    authStore
        .getCsrfCookie()
        .then(() => {
            return axios.post('/forgot-password', form.data);
        })
        .then((response) => {
            clearErrors();
            setFlashMessage('success', response.data.status);
        })
        .catch((error) => handleAxiosError(error))
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
        <template
            #message
            v-if="flashMessages.success"
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow"
            >
                {{ flashMessages.success }}
            </Message>
        </template>

        <div class="mb-6 text-sm text-muted-color">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>

        <form @submit.prevent="submit">
            <div class="mb-6">
                <label
                    for="email"
                    class="block mb-2"
                    >Email</label
                >
                <InputText
                    required
                    ref="email-input"
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

            <div class="flex justify-end items-center">
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Email Password Reset Link"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
