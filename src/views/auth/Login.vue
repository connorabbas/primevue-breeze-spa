<script setup>
import { ref, reactive } from 'vue';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Checkbox from 'primevue/checkbox';
import InputErrors from '@/components/InputErrors.vue';

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();

const form = reactive({
    processing: false,
    data: {
        email: '',
        password: '',
        remember: false,
    },
});

const showErrorToast = () => {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An unexpected error occurred, please try again later.',
        life: 3000,
    });
};
function submit() {
    form.processing = true;
    authStore
        .login(form.data)
        .catch((error) => {
            handleAxiosError(error);
            if (errors.critical || errors.other) {
                showErrorToast();
            }
        })
        .finally(() => {
            form.processing = false;
            // TODO
            /* if (hasNoErrors) {
                clearErrors();
            } */
        });
}
</script>

<template>
    <GuestLayout>
        <!-- <template
            #message
            v-if="status"
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow"
            >
                {{ status }}
            </Message>
        </template> -->

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
                <!-- TODO -->
                <!-- <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="mr-4 underline text-muted-color hover:text-color"
                >
                    Forgot your password?
                </Link> -->
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
