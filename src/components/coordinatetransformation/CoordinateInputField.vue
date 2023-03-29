<template>
    <span class="coordinate-input-field"
        :class="{
            isDegreesInput: props.epsgIsDegrees,
            isMetresInput: !props.epsgIsDegrees
        }">

        <!-- IKON -->
        <ArrowIcon :class="{arrowIconXCoordinate: props.epsgIsDegrees, arrowIconYCoordinate: !props.epsgIsDegrees}"/>

        <fieldset>
            <span class="input-with-unit"
                :class="{degreesInput: epsgIsDegrees}">
                <input
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

            <span class="input-with-unit"
                :class="{degreesInput: epsgIsDegrees}"
                v-show="props.epsgIsDegrees && (props.minutesChecked || props.secondsChecked)">
                <input
                    :class="{
                        degreesInput: degreesChecked,
                        metresInput: minutesChecked,
                        secondsInput: secondsChecked}"
                    v-model=props.minutes[element]
                    step="0.0001"
                />
                <span class="degrees">'</span>
            </span>

            <span class="input-with-unit"
                :class="{degreesInput: props.epsgIsDegrees}"
                v-show="props.epsgIsDegrees && secondsChecked">
                <input
                    :class="{
                        degreesInput: props.degreesChecked,
                        metresInput: props.minutesChecked,
                        secondsInput: props.secondsChecked}"
                    v-model=props.seconds[element]
                    step="0.0001"
                />
                <span class="degrees">"</span>
            </span>
        </fieldset>
    </span>
</template>

<script setup>
import { onUpdated } from 'vue';
import ArrowIcon from '@/assets/icons/ArrowIcon.vue'
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

<style scoped lang="scss">

.coordinate-input-field {
    display: flex;
    flex-direction: row;
    width: 30%;


    .input-with-unit {
        border-bottom: var(--sdfi_action) solid 1px;
        display: inline-flex;
        flex: 1;
        
        height: 1.3em;

        input {
            width: 90%;
            border: none;
            height: 1em;
            // padding-left: 5px;
            padding: 0, 0, 0, 5px;
        }
    }
}

/* input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
} */
/* input {
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