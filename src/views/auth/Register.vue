<script setup>
import { useTemplateRef, reactive, onMounted } from 'vue';
import router from '@/router';
import axios from '@/utils/axios';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import GuestLayout from '@/layouts/GuestLayout.vue';
import InputErrors from '@/components/InputErrors.vue';

const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors } = useErrorHandling();

const nameInput = useTemplateRef('name-input');

const form = reactive({
    processing: false,
    data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    },
});

const submit = () => {
    form.processing = true;
    authStore
        .getCsrfCookie()
        .then(() => {
            return axios.post('/register', form.data);
        })
        .then(async (response) => {
            clearErrors();
            await authStore.fetchUser();
            router.push({ name: 'dashboard' });
        })
        .catch((error) => handleAxiosError(error))
        .finally(() => {
            form.processing = false;
        });
};

onMounted(() => {
    nameInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>
        <form @submit.prevent="submit">
            <div class="mb-6">
                <label
                    for="name"
                    class="block mb-2"
                    >Name</label
                >
                <InputText
                    ref="name-input"
                    id="name"
                    type="text"
                    v-model="form.data.name"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.name)"
                    required
                    autocomplete="name"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.name"
                />
            </div>

            <div class="mb-6">
                <label
                    for="email"
                    class="block mb-2"
                    >Email</label
                >
                <InputText
                    id="email"
                    type="email"
                    v-model="form.data.email"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.email)"
                    required
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
                    id="password"
                    type="password"
                    v-model="form.data.password"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password)"
                    required
                    autocomplete="new-password"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.password"
                />
            </div>

            <div class="mb-6">
                <label
                    for="password_confirmation"
                    class="block mb-2"
                    >Confirm Password</label
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
                    class="mt-2"
                    :errors="errors.validation?.password_confirmation"
                />
            </div>

            <div class="flex justify-end items-center">
                <RouterLink
                    :to="{ name: 'login' }"
                    class="mr-4 text-muted-color underline text-muted-color hover:text-color"
                >
                    Already registered?
                </RouterLink>
                <Button
                    raised
                    type="submit"
                    :loading="form.processing"
                    label="Register"
                    severity="contrast"
                />
            </div>
        </form>
    </GuestLayout>
</template>
