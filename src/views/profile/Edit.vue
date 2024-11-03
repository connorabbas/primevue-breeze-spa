<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import Container from '@/components/Container.vue';
import ResponsiveCard from '@/components/ResponsiveCard.vue';
import DeleteUserForm from './partials/DeleteUserForm.vue';
import UpdatePasswordForm from './partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './partials/UpdateProfileInformationForm.vue';
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-bold text-xl leading-tight">Profile</h2>
        </template>

        <Container>
            <div class="py-12">
                <div class="space-y-6">
                    <Card
                        :pt="{
                            body: {
                                class: 'max-w-2xl space-y-3',
                            },
                            caption: {
                                class: 'space-y-1',
                            },
                        }"
                    >
                        <template #title>Profile Information</template>
                        <template #subtitle> Update your account's profile information and email address. </template>
                        <template #content>
                            <UpdateProfileInformationForm />
                        </template>
                    </Card>

                    <Card
                        :pt="{
                            body: {
                                class: 'max-w-2xl space-y-3',
                            },
                            caption: {
                                class: 'space-y-1',
                            },
                        }"
                    >
                        <template #title>Update Password</template>
                        <template #subtitle>
                            Ensure your account is using a long, random password to stay secure.
                        </template>
                        <template #content>
                            <UpdatePasswordForm />
                        </template>
                    </Card>

                    <Card
                        :pt="{
                            body: {
                                class: 'max-w-2xl space-y-3',
                            },
                            caption: {
                                class: 'space-y-1',
                            },
                        }"
                    >
                        <template #title>Delete Account</template>
                        <template #subtitle>
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                            Before deleting your account, please download any data or information that you wish to
                            retain.
                        </template>
                        <template #content>
                            <DeleteUserForm />
                        </template>
                    </Card>
                </div>
            </div>
        </Container>
    </AuthenticatedLayout>
</template>
