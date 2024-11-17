<script setup>
import { useTemplateRef, reactive, computed, onMounted } from 'vue';
import axios from '@/utils/axios';
import { useToast } from 'primevue/usetoast';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import { useFlashMessage } from '@/composables/useFlashMessage.js';
import InputErrors from '@/components/InputErrors.vue';

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();
const { flashMessages } = useFlashMessage();

const nameInput = useTemplateRef('name-input');

const verificationLinkSent = computed(() => flashMessages.success === 'verification-link-sent');

const form = reactive({
    processing: false,
    data: {
        name: authStore.user.name || '',
        email: authStore.user.email || '',
    },
});

const updateProfileInformation = () => {
    form.processing = true;
    axios
        .patch('/profile', form.data)
        .then(async () => {
            clearErrors();
            await authStore.fetchUser();
            toast.add({
                severity: 'success',
                summary: 'Saved',
                detail: 'Profile information has been updated',
                life: 3000,
            });
        })
        .catch((error) => handleAxiosError(error))
        .finally(() => {
            form.processing = false;
        });
};
const resendVerifyEmail = () => {
    authStore.sendVerificationEmail().catch((error) => handleAxiosError(error));
};

onMounted(() => {
    nameInput.value.$el.focus();
});
</script>

<template>
    <form
        @submit.prevent="updateProfileInformation"
        class="space-y-6"
    >
        <div class="space-y-2">
            <label for="name">Name</label>
            <InputText
                required
                ref="name-input"
                id="name"
                type="text"
                v-model="form.data.name"
                class="w-full"
                :invalid="Boolean(errors.validation?.name)"
                autocomplete="name"
            />
            <InputErrors :errors="errors.validation?.name" />
        </div>
        <div class="space-y-2">
            <label for="email">Email</label>
            <InputText
                required
                id="email"
                type="email"
                v-model="form.data.email"
                class="w-full"
                :invalid="Boolean(errors.validation?.email)"
                autocomplete="username"
            />
            <InputErrors :errors="errors.validation?.email" />
        </div>

        <div v-if="authStore.mustVerifyEmail && authStore.user.email_verified_at === null">
            <p class="text-sm mt-2">
                Your email address is unverified.
                <a
                    href="#"
                    @click="resendVerifyEmail"
                    class="underline text-sm text-muted-color underline text-muted-color hover:text-color"
                >
                    Click here to re-send the verification email.
                </a>
            </p>

            <Message
                v-if="verificationLinkSent"
                severity="success"
                :closable="false"
                class="shadow mt-4"
            >
                A new verification link has been sent to your email address.
            </Message>
        </div>

        <div class="flex items-center gap-4">
            <Button
                raised
                type="submit"
                :loading="form.processing"
                label="Save"
                severity="contrast"
            />

            <Transition
                enter-active-class="transition ease-in-out"
                enter-from-class="opacity-0"
                leave-active-class="transition ease-in-out"
                leave-to-class="opacity-0"
            >
                <p
                    v-if="form.recentlySuccessful"
                    class="text-sm text-muted-color"
                >
                    Saved.
                </p>
            </Transition>
        </div>
    </form>
</template>
