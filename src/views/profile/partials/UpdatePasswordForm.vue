<script setup>
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import InputErrors from '@/components/InputErrors.vue';

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();

const currentPasswordInput = ref(null);
const passwordInput = ref(null);

const form = reactive({
    processing: false,
    data: {
        current_password: '',
        password: '',
        password_confirmation: '',
    },
});

const showSuccessToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Your password has been updated',
        life: 3000,
    });
};
const updatePassword = () => {
    // Breeze API installation does not include profile related routes/functionality, implement as needed...
    showSuccessToast();
};
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium mt-0 mb-2">Update Password</h2>
            <p class="mb-0 text-sm text-muted-color">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form
            @submit.prevent="updatePassword"
            class="mt-6 space-y-6"
        >
            <div>
                <label
                    for="current_password"
                    class="block mb-2"
                    >Current Password</label
                >
                <InputText
                    required
                    id="current_password"
                    ref="currentPasswordInput"
                    type="password"
                    v-model="form.data.current_password"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.current_password)"
                    autocomplete="current-password"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.current_password"
                />
            </div>

            <div>
                <label
                    for="password"
                    class="block mb-2"
                    >New Password</label
                >
                <InputText
                    required
                    id="password"
                    ref="passwordInput"
                    type="password"
                    v-model="form.data.password"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password)"
                    autocomplete="new-password"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.password"
                />
            </div>

            <div>
                <label
                    for="password_confirmation"
                    class="block mb-2"
                    >Confirm Password</label
                >
                <InputText
                    required
                    id="password_confirmation"
                    type="password"
                    v-model="form.data.password_confirmation"
                    class="w-full"
                    :invalid="Boolean(errors.validation?.password_confirmation)"
                    autocomplete="new-password"
                />
                <InputErrors
                    class="mt-2"
                    :errors="errors.validation?.password_confirmation"
                />
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
