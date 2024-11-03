<script setup>
import { useTemplateRef, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useErrorHandling } from '@/composables/useErrorHandling';
import { useAuthStore } from '@/stores/auth';
import InputErrors from '@/components/InputErrors.vue';

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();

const currentPasswordInput = useTemplateRef('current-password-input');
const newPasswordInput = useTemplateRef('new-password-input');

const form = reactive({
    processing: false,
    data: {
        current_password: '',
        password: '',
        password_confirmation: '',
    },
});

const updatePassword = () => {
    // Breeze API installation does not include profile related routes/functionality, implement as needed...
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Your password has been updated',
        life: 3000,
    });
};
</script>

<template>
    <form
        @submit.prevent="updatePassword"
        class="space-y-6"
    >
        <div class="space-y-2">
            <label for="current_password">Current Password</label>
            <InputText
                required
                id="current_password"
                ref="current-password-input"
                type="password"
                v-model="form.data.current_password"
                class="w-full"
                :invalid="Boolean(errors.validation?.current_password)"
                autocomplete="current-password"
            />
            <template v-if="errors.validation?.current_password">
                <Message
                    v-for="errorMessage in errors.validation?.current_password"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ errorMessage }}
                </Message>
            </template>
        </div>

        <div class="space-y-2">
            <label for="password">New Password</label>
            <InputText
                required
                id="password"
                ref="new-password-input"
                type="password"
                v-model="form.data.password"
                class="w-full"
                :invalid="Boolean(errors.validation?.password)"
                autocomplete="new-password"
            />
            <template v-if="errors.validation?.password">
                <Message
                    v-for="errorMessage in errors.validation?.password"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ errorMessage }}
                </Message>
            </template>
        </div>

        <div class="space-y-2">
            <label for="password_confirmation">Confirm Password</label>
            <InputText
                required
                id="password_confirmation"
                type="password"
                v-model="form.data.password_confirmation"
                class="w-full"
                :invalid="Boolean(errors.validation?.password_confirmation)"
                autocomplete="new-password"
            />
            <template v-if="errors.validation?.password_confirmation">
                <Message
                    v-for="errorMessage in errors.validation?.password_confirmation"
                    severity="error"
                    variant="simple"
                    size="small"
                >
                    {{ errorMessage }}
                </Message>
            </template>
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
