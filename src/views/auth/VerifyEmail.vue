<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import Message from 'primevue/message';
import GuestLayout from '@/layouts/GuestLayout.vue';

const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors } = useErrorHandling();
const { flashMessages } = useFlashMessage();

const processing = ref(false);

const verificationLinkSent = computed(() => flashMessages.success === 'verification-link-sent');

const submit = () => {
    processing.value = true;
    authStore
        .sendVerificationEmail()
        .catch((error) => handleAxiosError(error))
        .finally(() => {
            processing.value = false;
        });
};
</script>

<template>
    <GuestLayout>
        <template
            #message
            v-if="verificationLinkSent"
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow"
            >
                A new verification link has been sent to the email address you provided during registration.
            </Message>
        </template>

        <div class="mb-6 text-sm text-muted-color">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-6 flex justify-between items-center">
                <Button
                    raised
                    type="submit"
                    :loading="processing"
                    label="Resend Verification Email"
                    severity="contrast"
                />
                <a
                    @click="authStore.logout()"
                    href="#"
                    class="text-muted-color underline text-muted-color hover:text-color"
                >
                    Log Out
                </a>
            </div>
        </form>
    </GuestLayout>
</template>
