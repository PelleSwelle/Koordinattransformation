<template>
    <span
        class="coordinate-input-field"
        :class="{
            isDegreesInput: props.epsgIsDegrees,
            isMetresInput: !props.epsgIsDegrees
        }"
        v-show = "props.is3D">
        <ArrowIcon/>
        <span class="input-field">
            <input
                v-model=props.heightInMeters
                step="0.0001"
            />
        </span>
        <span class="units">m</span>
    </span>
</template>

<script setup>
import { inject } from 'vue';
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
const colors = inject('themeColors')

const props = defineProps({
    epsgIsDegrees: Boolean,
    heightInMeters: Number,
    is3D: Boolean
})
</script>

<style scoped lang="scss">

.coordinate-input-field {
    display: flex;

    .input-field {
        border-bottom: var(--sdfi-action) solid 1px;
        display: inline-flex;
        flex: 1;
        /* width: 10%; */
        /* margin-right: 0.5rem; */
        /* padding-bottom: 0.25rem; */
        input {
            height: 24px;
            padding-left: 5px !important;
        }
    }
}

.isDegreesInput {
    margin-top: 0.25rem;
    display: inline-flex;
    align-items: center;
    width: 100%;
}
.isMetresInput {
    width: 33%;
}
.units {
    padding-top: .15rem;
    transform: translateX(-1.5em);
}

/*
.height-input-field {
    border-bottom: var(--action) solid 1px;
    display: inline-flex;
    flex: 1;
    width: 10%;
    margin-bottom: -1.9rem;
    margin-right: 0.5rem;
    padding-bottom: 0.25rem;
}
.input-field {
    border-bottom: var(--action) solid 1px;
    display: inline-flex;
    flex: 1;
    width: 10%;
    margin-right: 0.5rem;
    padding-bottom: 0.25rem;
    height: 2rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input {
    -moz-appearance: textfield;
    appearance: textfield;
    border: none;
    width: 100%;
    height: 2rem !important;
    padding: 0px 10px 0px 10px !important;
} */
.arrow-icon-x-coordinate {
    transform: rotate(90deg);
}
.arrow-icon-z-coordinate {
    transform: rotate(45deg);
}
.arrow-icon-x-coordinate {
    transform: rotate(90deg);
}
</style>