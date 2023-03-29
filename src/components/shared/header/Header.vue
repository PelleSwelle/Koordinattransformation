<template>
    <section class="nav-container">

    <nav class="ds-nav-main" data-theme="light"
        v-show='window.width > minWidth || (burgerClicked && window.width < minWidth)'
        :class="{'menuDropDown': burgerClicked}">
            <ul>
                <router-link class="brand"
                    @click="clearFilters"
                    to="/">
                    <SdfiLogo/>

                    <div class="brand-name"
                        @mouseenter.stop="isHovering = true"
                        @mouseleave.stop="isHovering = false"
                    >
                        <h4>Koordinattransformation</h4>
                    </div>
                </router-link>
            </ul>
            <ul>
                <li @click='handleClick'>
                    <router-link to='/Denmark'>
                        <h4>Danmark</h4>
                    </router-link>
                </li>

                <li @click='handleClick'>
                <router-link to='/Greenland'>
                    <h4>Grønland</h4>
                </router-link>
                </li>

                <li @click='handleClick'>
                    <router-link to='/About'>
                        <h4>Om Koordinattransformation</h4>
                    </router-link>
                </li>
            </ul>

        </nav>
        <BurgerIcon v-show='window.width < minWidth' @click="handleClick"/>
    </section>

</template>

<script>
// import Brand from '@/components/shared/header/Brand.vue'

import { inject, ref } from 'vue'
import BurgerIcon from '@/assets/icons/BurgerIcon.vue'
import SdfiLogo from '@/assets/icons/SdfiLogo.vue'

export default {
    name: "HeaderNavComponent",

    components: { SdfiLogo },

    setup() {
        const colors = inject("themeColors");
        const burgerClicked = ref(false);
        const isHovering = false

        return {
            colors,
            burgerClicked,
            isHovering
        };
    },

    data() {
        return {
            window: {
                width: 0,
                height: 0
            },
            minWidth: 880
        };
    },

    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },

    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        handleClick() {
            this.burgerClicked = !this.burgerClicked;
        },

        clearFilters () {
            window.location.replace(window.location.protocol + '//' + window.location.host)
        }
    // this.$store.dispatch('Filters/clear')
    },

    provide() {
        return window;
    },


}
</script>

<style scoped lang="scss">

.nav-container {
    height: 4rem;
}
.brand {
    // padding-top: 0.5rem;
    display: flex;
    cursor: default;
    grid-column: 1;
    margin-left: 50px;

    .brand-name {
    align-self: flex-start;
    padding-left: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
}
}


</style>
