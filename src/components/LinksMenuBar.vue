<script setup>
import { useTemplateRef } from 'vue';
import Menubar from 'primevue/menubar';

const childRef = useTemplateRef('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <Menubar ref="child-ref">
        <template
            v-if="$slots.start"
            #start
        >
            <slot name="start"></slot>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
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
                    :class="{
                        'font-bold text-primary dark:text-primary-300 bg-primary-50 dark:bg-primary-950 rounded-lg':
                            item.active,
                    }"
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
                <i
                    v-if="hasSubmenu"
                    :class="[
                        'pi pi-angle-down',
                        {
                            'pi-angle-down ml-2': root,
                            'pi-angle-right ml-auto': !root,
                        },
                    ]"
                ></i>
            </a>
        </template>
        <template
            v-if="$slots.end"
            #end
        >
            <slot name="end"></slot>
        </template>
    </Menubar>
</template>
