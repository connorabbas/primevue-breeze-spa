<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import Message from 'primevue/message';
import GuestLayout from '@/layouts/GuestLayout.vue';
import InputErrors from '@/components/InputErrors.vue';

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();

const status = ref(null);
const emailInput = ref();

const form = reactive({
    processing: false,
    data: {
        email: '',
    },
});

function submit() {
    status.value = null;
    form.processing = true;
    authStore
        .requestPasswordResetLink(form.data)
        .then((response) => {
            // success, handle the status message
            status.value = response.data.status
            clearErrors();
        })
        .catch((error) => {
            handleAxiosError(error);
            if (errors.critical || errors.other) {
                showErrorToast();
            }
        })
        .finally(() => {
            form.processing = false;
        });
}

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <GuestLayout>

        <template #message v-if="status">
            <Message severity="success" :closable="false" class="shadow">
                {{ status }}
            </Message>
        </template>

        <div class="mb-6 text-sm text-muted-color">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
        </div>

        <form @submit.prevent="submit">
            <div class="mb-6">
                <label for="email" class="block mb-2">Email</label>
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
