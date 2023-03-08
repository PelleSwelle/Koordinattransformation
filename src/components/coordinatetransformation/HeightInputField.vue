<template>
    <span id="third-input"
        class="height-input"
        :class="{
            isDegreesInput: props.epsgIsDegrees,
            isMetresInput: !props.epsgIsDegrees
        }"
        v-show = "is3D">
        <span v-if="props.epsgIsDegrees">
            <span class="ds-icon-map-icon-nordpil"></span>
        </span>
        <span class="height-input-field">
            <input
            :class="{degreesInput: true}"
            v-model=props.heightInMeters
            step="0.0001"
            />
            <span class="degrees">m</span>
        </span>
    </span>
</template>

<script setup>
import { inject } from 'vue';
const colors = inject('themeColors')

const props = defineProps({
    epsgIsDegrees: Boolean,
    heightInMeters: Number
})
</script>

<style scoped>

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
}
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