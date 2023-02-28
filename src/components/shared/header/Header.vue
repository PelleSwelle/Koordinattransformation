<template>
    <header class="ds-nav-main">
        <Brand/>
        <div class="nav-container">
            <Nav></Nav>
        </div>
    </header>
</template>

<script setup>
import Brand from '@/components/shared/header/Brand.vue'
import Nav from '@/components/shared/header/Nav.vue'
</script>

<style scoped>

header{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 3.5vw;
    width: 100%;
    height: 4rem;
    z-index: 0;
    top: 0;
    padding: 0 5vw 0 5vw;
    align-items: flex-start;
    grid-template-rows: auto;
    border-bottom: 1px solid var(--sdfi_action);
}

.nav-container {

    grid-column: 2 / -1;
    justify-content: flex-end;
    display: flex;
    flex-direction: row;
}
</style>
