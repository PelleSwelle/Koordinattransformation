<template>
    <div class="menu-closer" @click="handleClose">
        <DropdownIcon :class="{iconUp: props.iconUp, iconDown: !props.iconUp}"/>
    </div>
</template>

<script setup>
import DropdownIcon from '@/assets/icons/DropdownIcon.vue';

const emit = defineEmits(['handle-close'])

function handleClose () {
    emit('handle-close')
}

const props = defineProps({
    iconUp: Boolean
})
</script>

<style scoped lang="scss">
    .menu-closer {
        position: relative;
        text-align: center;
        width: 100%;
        height: 1.5rem;
        background: white;

        .iconUp {
            transform: rotate(180deg);
        }
        .iconDown {
            transform: rotate(0deg);
        }
    }

</style>
