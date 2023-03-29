<template>
    <Transition name="close">
        <div class="coordinate-transformation-box" v-show="menuOpen || window.width > 1000" ref="mother">
            <InputCard class="input-card"
                @input-epsg-changed="inputEPSGChanged"
                @error-occurred="errorOccurred"
                @input-coords-changed="inputCoordsChanged"
                @is-3d-changed="is3DChanged"
            />
            <OutputCard class="output-card"
                :inputEPSG=inputEPSG
                :inputCoords=inputCoords
                @error-occurred="errorOccurred"
                @coordinates-copied="coordinatesCopied"
                :is3D=is3D
            />
            <menu-closer
                :iconUp="this.menuOpen"
                class="menu-closer"
                @handle-close="this.menuOpen = false"
            />
            <div v-show="popupVisible" class="message">Koordinater kopieret</div>
            <div v-show="mapErrorIsVisible" class="message">{{ mapError }}</div>
            <div v-show="errorVisible" class="message">{{ error }}</div>
        </div>
    </Transition>

    <Transition name="open">
        <menu-closer
            :iconUp="this.menuOpen"
            class="menu-closed"
            v-show="!this.menuOpen && window.width < 1000"
            @handle-close="this.menuOpen = true" />
    </Transition>
</template>

<script>
/**
 * CoordinateTransformation er forældre til input- og outputkomponenterne samt barn til Map-komponentet.
 * Den er bindeled og står for koordinering mellem de tre komponenter:
 * Når brugeren klikker på kortet i Map, skal både Input og Output vide det.
 * Og når en EPSG-koden eller koordinatsættet ændres i Input, skal Output vide dette for at
 * Komponentet står også for at vise fejlmeddelelser, men (på trods af navnet) ikke for nogen af transformationerne
 */
import { defineAsyncComponent, ref, inject } from 'vue'

export default {
    name: 'CoordinateTransformation',
    components: {
        InputCard: defineAsyncComponent(() => import('@/components/coordinatetransformation/InputCard.vue')),
        OutputCard: defineAsyncComponent(() => import('@/components/coordinatetransformation/OutputCard.vue')),
        MenuCloser: defineAsyncComponent(() => import('@/components/coordinatetransformation/MenuCloser.vue'))
    },
    props: {
        mapError: {
            type: String,
            default () { return '' }
        },
        mapErrorIsVisible: {
            type: Boolean,
            default () { return false }
        }
    },
    methods: {
        /**
         * updates the input EPSG to the given EPSG code
         * and emits an event input-epsg-changed
         * @param code
         */
        inputEPSGChanged (code) {
            this.inputEPSG = code.srid
            this.$emit('input-epsg-changed', code.srid)
        },

        /**
         * emits an event input-coord-changed
         * run when the input coordinates in the input card is changed
         * e.g. when choosing EPSG, when clicking map, when changed manually, when entering address
         * @param coords
         */
        inputCoordsChanged (coords) {
            this.inputCoords = coords
            this.$emit('input-coords-changed', coords)
        },

        is3DChanged (state) {
            this.is3D = state
        },

        errorOccurred (state, err) {
            this.error = err
            this.errorVisible = state
        },

        coordinatesCopied (state) {
            this.popupVisible = state
        },

        handleResize () {
            this.window.width = window.innerWidth
            this.window.height = window.innerHeight
        }
    },

    setup () {
        const inputCoords = ref(inject('inputCoords'))
        const is3D = ref(true)
        const colors = inject('themeColors')
        const inputEPSG = inject('inputEPSG')
        const popupVisible = ref(false)
        const menuOpen = ref(true)
        const window = ref({ width: 0, height: 0 })
        const errorVisible = ref('')
        const error = ref('')

        return {
            inputCoords,
            colors,
            inputEPSG,
            popupVisible,
            menuOpen,
            window,
            error,
            errorVisible,
            is3D
        }
    },

    created () {
        // window.addEventListener('resize', this.handleResize)
        // this.handleResize()
    }
}
</script>

<style scoped lang="scss">
@media screen {
    .coordinate-transformation-box {
        display: grid;
        width: 100%;
        border: 2px solid var(--sdfi_darkSteel);
        border-radius: 25px;
        box-shadow: 0 0 0 4px var(--sdfi_vibrantSteel);
        z-index: 1;
    }
    .message {
        align-self: center;
        text-align: center;
        margin: 1rem 0 0 0;
        padding: 1rem;
        background: var(--sdfi_lightSteel);
        border-radius: 18px;
    }
    .input-card {
        border-radius: 25px 25px 0 0;
        position: relative;
        padding: 1rem 1.5rem;
        background: var(--sdfi_white);
        border-bottom: var(--sdfi_action) solid 2px;
        border-right: none;
    }
    .output-card {
        border-radius: 0 0 0 0;
        border-top: none;
    }

    .input-card:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        border-style: solid;
        border-width: 14px 10px 0;
        border-color: var(--sdfi_white) transparent;
        display: block;
        width: 0;
        z-index: 3;
        transform: translateY(100%);
    }
    
    .input-card:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        border-style: solid;
        border-width: 18px 13px 0;
        border-color: var(--sdfi_action) transparent;
        display: block;
        width: 0;
        z-index: 2;
        transform: translateY(100%) translateX(-3px);
    }
    
    .menu-closer {
        border-radius: 0 0 25px 25px;
    }
    
    .menu-closed {
        border-radius: 25px;
        border: 2px solid var(--sdfi_darkSteel);
        box-shadow: 0 0 0 4px var(--sdfi_vibrantSteel);
    }    
}

@media screen and (min-width: 1000px) {
    .coordinate-transformation-box {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "input output"
    }
    .input-card {
        border-radius: 25px 0 0 25px;
        border-right: var(--sdfi_action) solid 2px;
        border-bottom: none;
    }
    .input-card:after {
        content: "";
        position: absolute;
        bottom: 50%;
        left: 100%;
        border-style: solid;
        border-width: 10px 0 10px 14px;
        border-color: transparent var(--sdfi_white);
        display: block;
        width: 0;
        z-index: 3;
        transform: translateY(50%);
    }
    .input-card:before {
        content: "";
        position: absolute;
        bottom: 50%;
        left: 100%;
        border-style: solid;
        border-width: 12px 0 12px 17px;
        border-color: transparent var(--sdfi_action);
        display: block;
        width: 0;
        z-index: 2;
        transform: translateY(50%);
    }
    .output-card {
        border-radius: 0 25px 25px 0;
    }
    .menu-closer {
        display: none;
    }


}

/* ANIMATION */
.close-enter-active, .close-leave-active {
    transition: all .5s ease-in-out;
}

.close-enter-from, .close-leave-to {
    transform: translateY(-50vh);
}
.open-enter-active {
    transition: all .5s step-end;
}
.open-leave-active {
    transition: all .5s step-start;
}
.open-enter-from, .open-leave-to {
    opacity: 0;
}
</style>
