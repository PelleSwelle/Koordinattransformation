<template>
    <span class="coords-with-arrow-and-units"
        :class="{
            isDegreesInput: props.epsgIsDegrees,
            isMetresInput: !props.epsgIsDegrees
        }">

        <!-- IKON -->
        <span
            :class="{
                arrowIconXCoordinate: props.epsgIsDegrees,
                arrowIconYCoordinate: !props.epsgIsDegrees
            }">
            <span class="ds-icon-map-icon-nordpil"></span>
        </span>

        <span class="input-field"
            :class="{degreesInput: epsgIsDegrees}">
            <input
                class="coordinates"
                :class="{
                    degreesInput: degreesChecked,
                    metresInput: minutesChecked,
                    secondsInput: secondsChecked}"
                step="0.0001"
                v-model=props.degrees[element]
            />
            <span class="unit" v-show="props.epsgIsDegrees">°N</span>
            <span class="unit" v-show="!props.epsgIsDegrees">m</span>
        </span>

        <span class="input-field"
            :class="{degreesInput: epsgIsDegrees}"
            v-show="props.epsgIsDegrees && (props.minutesChecked || props.secondsChecked)">
            <input
                class="coordinates"
                :class="{
                    degreesInput: degreesChecked,
                    metresInput: minutesChecked,
                    secondsInput: secondsChecked}"
                v-model=props.minutes[element]
                step="0.0001"
            />
            <span class="degrees">'</span>
        </span>

        <span class="input-field"
            :class="{degreesInput: props.epsgIsDegrees}"
            v-show="props.epsgIsDegrees && secondsChecked">
            <input
                class="coordinates"
                :class="{
                    degreesInput: props.degreesChecked,
                    metresInput: props.minutesChecked,
                    secondsInput: props.secondsChecked}"
                v-model=props.seconds[element]
                step="0.0001"
            />
            <span class="degrees">"</span>
        </span>
    </span>
</template>

<script setup>
import { onUpdated } from 'vue';
const props = defineProps({
    epsgIsDegrees: Boolean,
    degrees: [],
    minutes: [],
    seconds: [],
    element: Number,
    degreesChecked: Boolean,
    minutesChecked: Boolean,
    secondsChecked: Boolean
})

const emit = defineEmits([
    'coords-changed'
])

onUpdated(() => {
    emit('coords-changed')
})
</script>

<style scoped>

.coords-with-arrow-and-units {
    display: flex;
}
/* .input-field {
    border-bottom: var(--action) solid 1px;
    display: inline-flex;
    flex: 1;
    width: 10%;
    margin-right: 0.5rem;
    padding-bottom: 0.25rem;
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
} */
.arrowIconXCoordinate {
    transform: rotate(90deg);
}
.arrowIconYCoordinate {
    transform: rotate(0deg);
}
.arrowIconZCoordinate {
    transform: rotate(45deg);
}
</style>