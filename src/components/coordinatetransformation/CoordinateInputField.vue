<template>
    <div class="input">
        <span class="icon">
            <Icon v-if="arrowDir == 0"
              icon="ArrowIcon"
              :width="2"
              :height="2"
              :color="colors.turquoise"
              :stroke-width="0"
              class="hori-arrow"
            />
            <Icon v-else-if="arrowDir == 1"
              icon="ArrowIcon"
              :width="2"
              :height="2"
              :color="colors.turquoise"
              :stroke-width="0"
              class="vert-arrow"
            />
            <Icon v-else-if="arrowDIr == 2"
              icon="ArrowIcon"
              :width="2"
              :height="2"
              :color="colors.turquoise"
              :stroke-width="0"
              class="angle-arrow"
            />

        </span>
        <span class="inputField">
            <input type="Number" :value="value">
        </span>
        <span class="units">

            <!-- if in degrees -->
            <span v-if="props.isDegrees">°{{direction}}</span>

            <!-- if in meters -->
            <span v-else>m</span>
            <!-- if the units are in meters, show direction in units-->
            <span v-show="!isDegrees" class="direction">{{props.direction}}</span>
        </span>
    </div>
</template>

<script setup>
import { inject, defineProps } from 'vue'

const colors = inject('themeColors')

// const isDegrees = true

// const direction = ref('north')
const props = defineProps({
  // northing, easting, height
  direction: String,
  isDegrees: Boolean,
  arrowDir: Number,
  unit: String,
  value: Number
})

</script>
<style scoped>
.input {
  border-bottom: var(--action) solid 1px;
  display: inline-flex;
  flex: 1;
  width: 10%;
  margin-right: 0.5rem;
  padding-bottom: 0.25rem;
}
.icon {
    transform: rotate(90deg);
}

.hori-arrow {
    transform: rotate(-90deg);
}

.vert-arrow {
    transform: rotate(0deg);
}

.angle-arrow {
    transform: rotate(-45deg);
}

input {
    appearance: none;
    -moz-appearance: textfield;
    border: none;
    width: 100%;
}
</style>
