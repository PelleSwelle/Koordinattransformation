<template>
    <div class='input-container'>
      <span :class='{
          isDegreesInput: isDegrees,
          isMetresInput: !isDegrees
        }'
      >
      <!-- TODO: make turnable -->
        <ArrowIcon
          :height='33'
          :width='33'
          :color="colors.turquoise"
          :stroke-width='0'/>
        <input type='text'
          :class="{
            // depending on what is checked, the content of this field will change
            degreesInput: degreesChecked,
            metresInput: minutesChecked,
            secondsInput: secondsChecked
          }"
        >
      </span>
      <span class="unit" v-show="isDegrees">°N</span>
      <span class="unit" v-show="!isDegrees">m</span>
    </div>
</template>

<script>
import { inject, ref } from 'vue'
import ArrowIcon from '../shared/icons/ArrowIcon.vue'
export default {
  name: 'CoordinateInputField',

  setup (props, { emit }) {
    const colors = inject('themeColors')

    // variable to store degrees, when we get them
    // const degrees = ref([0, 0])
    // const minutes = ref([0, 0])
    // const seconds = ref([0, 0])
    // const meters = ref(0)

    // where the marker is placed on the map
    // TODO: where does it come from
    // const markerCoordinates = inject('mapMarkerCoords')

    // get the value from the above line.
    // const mapCoords = ref(markerCoordinates.value)

    // const setCoordinateFieldValue = () => {
    //   if (degrees) {
    //     degrees.value[0] = parseFloat(mapCoords.value[0].toFixed[4])
    //     degrees.value[1] = parseFloat(mapCoords.value[1].toFixed[4])
    //   } else if (minutes) {
    //     degrees.value[0] = Math.floor(mapCoords.value[0])
    //     degrees.value[1] = Math.floor(mapCoords.value[1])
    //     minutes.value[0] = parseFloat(((mapCoords.value[0])))
    //   }
    // }

    const isDegrees = ref(true) // TODO: make this false again. only for testing
    return {
      isDegrees,
      colors
    }
  },

  components: { ArrowIcon }
}

</script>

<style scoped>
.isMetresInput {
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
}
.input .isMetresInput {
  flex-grow: 1;
}

Input {
  width: 100%;
  appearance: textfield;
  -moz-appearance: textfield;
  border: none;
  display: flex;
  flex: 1;
}

.arrow-icon {
  transform: rotate(45deg);
}
.isDegreesInput {
  margin-top: 0.25rem;
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.input-container {
  border-bottom: var(--action) solid 1px;
  display: flex;
  flex: 1;
  margin-right: 1rem;
  padding-bottom: 0.25rem;
}
</style>
