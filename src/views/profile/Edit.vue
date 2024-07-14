<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import Container from '@/components/Container.vue';
import ResponsiveCard from '@/components/ResponsiveCard.vue';
import DeleteUserForm from './partials/DeleteUserForm.vue';
import UpdatePasswordForm from './partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm.vue';

const props = defineProps({
    auth: Object,
    mustVerifyEmail: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl leading-tight">Profile</h2>
        </template>

        <Container :spaced-mobile="false">
            <div class="py-12">
                <div class="space-y-6">
                    <ResponsiveCard>
                        <UpdateProfileInformationForm
                            :must-verify-email="mustVerifyEmail"
                            :status="status"
                            class="max-w-xl"
                        />
                    </ResponsiveCard>

                    <!-- <ResponsiveCard>
                        <UpdatePasswordForm class="max-w-xl" />
                    </ResponsiveCard>

                    <ResponsiveCard>
                        <DeleteUserForm class="max-w-xl" />
                    </ResponsiveCard> -->
                </div>
            </div>
        </Container>
    </AuthenticatedLayout>
</template>
