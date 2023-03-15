<template>
    <router-link
        @click="clearFilters"
        to="/"
        class="brand"
    >
    <SdfiLogo/>
    <div
        class="brand-name"
        @mouseenter.stop="isHovering = true"
        @mouseleave.stop="isHovering = false"
    >
        <h5 class="cursor-point">Koordinattransformation</h5>
    </div>
    </router-link>
</template>

<script setup>
import SdfiLogo from '@/assets/icons/SdfiLogo.vue';
const isHovering = false

function clearFilters () {
    window.location.replace(window.location.protocol + '//' + window.location.host)
    // this.$store.dispatch('Filters/clear')
}
</script>

<style scoped>

.brand {
    padding-top: 0.5rem;
    display: flex;
    cursor: default;
    grid-column: 1;
}

.brand-name {
    align-self: flex-start;
    padding-left: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
}

h5 {
    white-space: nowrap;
    word-break: keep-all;
    break-inside: avoid;
    line-break: strict;
    hyphens: none;
    color: var(--sdfi-black);
}
</style>
