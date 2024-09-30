<script setup>
import { useTemplateRef, reactive, onMounted } from 'vue';
import router from '@/router';
import axios from '@/utils/axios';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Checkbox from 'primevue/checkbox';
import InputErrors from '@/components/InputErrors.vue';
import Message from 'primevue/message';

const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors } = useErrorHandling();
const { flashMessages } = useFlashMessage();

const emailInput = useTemplateRef('email-input');

const form = reactive({
    processing: false,
    data: {
        email: '',
        password: '',
        remember: false,
    },
});

const submit = () => {
    form.processing = true;
    authStore
        .getCsrfCookie()
        .then(() => {
            return axios.post('/login', form.data);
        })
        .then((response) => {
            clearErrors();
            authStore.getUser().finally(() => {
                const redirectPath = router.currentRoute.value.query?.redirect;
                if (redirectPath) {
                    router.push({ path: redirectPath });
                } else {
                    router.push({ name: 'dashboard' });
                }
            });
        })
        .catch((error) => handleAxiosError(error))
        .finally(() => {
            form.processing = false;
            form.data.password = null;
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

            <div class="mb-6">
                <label
                    for="password"
                    class="block mb-2"
                    >Password</label
                >
                <InputText
                    required
                    id="password"
                    type="password"
                    v-model="form.data.password"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password)"
                    autocomplete="current-password"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.password"
                />
            </div>

            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <Checkbox
                            id="remember"
                            :binary="true"
                            v-model="form.remember"
                            class="mr-2"
                        ></Checkbox>
                        <label for="remember">Remember me</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center">
                <RouterLink
                    :to="{ name: 'forgotPassword' }"
                    class="mr-4 underline text-muted-color hover:text-color"
                >
                    Forgot your password?
                </RouterLink>
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Log In"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
