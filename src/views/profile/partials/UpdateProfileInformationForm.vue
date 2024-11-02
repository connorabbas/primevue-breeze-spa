<script setup>
import { useTemplateRef, reactive, computed, onMounted } from 'vue';
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
    // Breeze API installation does not include profile related routes/functionality, implement as needed...
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Profile information has been updated',
        life: 3000,
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
    <section>
        <header>
            <h2 class="text-lg font-medium mt-0 mb-2">Profile Information</h2>
            <p class="mb-0 text-sm text-muted-color"> Update your account's profile information and email address. </p>
        </header>

        <form
            @submit.prevent="updateProfileInformation"
            class="mt-6 space-y-6"
        >
            <div>
                <label
                    for="name"
                    class="block mb-2"
                    >Name</label
                >
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
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.name"
                />
            </div>
            <div>
                <label
                    for="email"
                    class="block mb-2"
                    >Email</label
                >
                <InputText
                    required
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
    </section>
</template>
