<script setup></script>

<template>
    <main>
        <div>
            <h1>This is the home page</h1>
            <nav class="mb-3 text-center">
                <RouterLink
                    :to="{ name: 'home' }"
                    class="mr-4"
                    >Home</RouterLink
                >
                <RouterLink
                    :to="{ name: 'dashboard' }"
                    class="mr-4"
                    >Dashboard</RouterLink
                >
                <RouterLink
                    :to="{ name: 'login' }"
                    class="mr-4"
                    >Login</RouterLink
                >
                <RouterLink :to="{ name: 'register' }">Register</RouterLink>
            </nav>
        </div>
    </main>
</template>
