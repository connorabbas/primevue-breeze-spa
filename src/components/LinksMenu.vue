<script setup>
import { useTemplateRef } from 'vue';
import Menu from 'primevue/menu';

const childRef = useTemplateRef('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <Menu ref="child-ref">
        <template #item="{ item, props }">
            <RouterLink
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
            >
                <a
                    :href="href"
                    v-bind="props.action"
                    @click="navigate"
                    class="p-menubar-item-link"
                >
                    <span
                        v-show="item.icon"
                        :class="item.icon"
                        class="p-menu-item-icon"
                    />
                    <span class="p-menu-item-label">{{ item.label }}</span>
                </a>
            </RouterLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
            >
                <span
                    v-show="item.icon"
                    :class="item.icon"
                    class="p-menu-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
