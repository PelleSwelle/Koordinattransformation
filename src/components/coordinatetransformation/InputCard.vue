<template>
  <section>
    <div class="title-bar">
      <h3>Input</h3>
    </div>
    <section class="coordinate-selection-wrapper">
      <EpsgSelection :isOutput="false" @epsg-changed="inputEPSGChanged"/>
    </section>

    <!-- the whole input area -->
    <!-- TODO: style this with flex box. if degrees, one line, if meters 3 lines -->
    <div class="input">
      <div class="inputComponents">
        <CoordinateInputField :isDegrees=isDegrees :value=degrees[0] :unit="unitFirst" :direction="firstDirection" arrowDir="0"/>
        <CoordinateInputField :isDegrees=isDegrees :value=degrees[1] :unit="unitSecond" :direction="secondDirection" arrowDir="1"/>
        <!-- <CoordinateInputField v-model=degrees[2] :unit="unitThird" :direction="thirdDirection" arrowDir="2"/> -->
      </div>
      <!-- first input -->
      <!-- isDegrees bliver brugt på hele tingen, ikonetinputWrapperen, unit -->
      <!-- TODO: this is doing the same thing twice -->
      <span :class="{
        isDegreesInput: isDegrees,
        isMetresInput: !isDegrees}">
        <!-- Ombyt ikoner ved decimalgrader -->
        <Icon v-if="isDegrees"
          icon="ArrowIcon"
          :width="2"
          :height="2"
          :color="colors.turquoise"
          :stroke-width="0"
          class="arrow-icon"
        />
        <Icon v-else
          icon="ArrowIcon"
          :width="2"
          :height="2"
          :color="colors.turquoise"
          :stroke-width="0"
          class="arrow-icon arrow-icon-x-coordinate"
        />
        <span class="coordinates-input" :class="{degreesInput: isDegrees}">
          <input
            class="coordinates"
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            type="number"
            step="0.0001"
            v-model=degrees[0]
          />
          <span class="unit" v-show="isDegrees">°N</span>
          <span class="unit" v-show="!isDegrees">m</span>
        </span>
        <span class="coordinates-input" :class="{degreesInput: isDegrees}" v-show="isDegrees && (minutesChecked || secondsChecked)">
          <input
            class="coordinates"
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=minutes[0]
            type="number"
            step="0.0001"
          />
          <span class="degrees">'</span>
        </span>
        <span class="coordinates-input" :class="{degreesInput: isDegrees}" v-show="isDegrees && secondsChecked">
          <input
            class="coordinates"
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=seconds[0]
            type="number"
            step="0.0001"
          />
          <span class="degrees">"</span>
        </span>
      </span>
    </div>
    <div class="footer">
      <div class="searchbar">
        <input class="searchbar-input" id="dawa-autocomplete-input"/>
        <Icon
          icon="SearchIcon"
          class="searchbar-icon"
          :color="colors.turquoise"
          :width="1.8"
          :height="1.8"
          :stroke-width="0.75"
        />
      </div>
      <div class="radiogroup" v-show="isDegrees" :class="{radioGroupDisabled: !isDegrees}">
        <label class="radio" @click="checkDegrees">
          <input type="radio" name="date-format">
          <Icon v-show="degreesChecked"
            icon="RadioOnIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.turquoise"
          />
          <Icon v-show="!degreesChecked"
            icon="RadioIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.darkSteel"
          />
          DD
        </label>
        <label class="radio" @click="checkMinutes">
          <input type="radio" name="date-format">
          <Icon v-show="minutesChecked"
            icon="RadioOnIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.turquoise"
          />
          <Icon v-show="!minutesChecked"
            icon="RadioIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.darkSteel"
          />
          min.
        </label>
        <label class="radio" @click="checkSeconds">
          <input type="radio" name="date-format">
          <Icon v-show="secondsChecked"
            icon="RadioOnIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.turquoise"
          />
          <Icon v-show="!secondsChecked"
            icon="RadioIcon"
            :width="1.3"
            :height="1.3"
            :strokeWidth="1"
            :color="colors.darkSteel"
          />
          <span style="display: inline-flex;">min. sek.</span>
        </label>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * InputCoordinates er selvsagt komponentet, hvor brugeren vælger en input EPSG-kode og inputkoordinater.
 * Koordinaterne kan tastees manuelt, eller ved at indtaste en addresse i søgefeltet.
 * De kan også nedarves fra Map.vue (og kaldes her 'mapMarkerInputCoords') via inject
 * Det skal emitte til sin forældre CoordinateTransformation, hvis koordinaterne eller EPSG-koden ændres,
 * eller hvis der er sket en transformationsfejl (f.eks. out-of-bounds)
 */
import { defineAsyncComponent, ref, inject, onUpdated, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'InputCoordinates',

  components: {
    EpsgSelection: defineAsyncComponent(() => import('@/components/coordinatetransformation/EpsgSelection')),
    CoordinateInputField: defineAsyncComponent(() => import('./CoordinateInputField'))
  },

  methods: {
    // UTranformation af inputkoordinaterne, når brugeren vælger ny EPSG
    inputEPSGChanged (epsgCode) {
      // Decimal degrees (DD), eller DMS?
      if (epsgCode.v1_unit === 'degree') {
        this.epsgIsDegrees = true
        this.checkDegrees()
      } else if (epsgCode.v1_unit === 'meter') {
        console.log('ESPG code is in meters')
        this.epsgIsDegrees = false
        this.disableRadioButtons()
      }
      // 3D eller 2D?
      this.is3D = epsgCode.v3 !== null

      if (this.is3D) {
        // gets the epsg data from the store
        this.store.dispatch('trans/get', this.inputEPSG + '/' + epsgCode.srid + '/' + this.mapMarkerValues[0] + ',' + this.mapMarkerValues[1] + ',' + this.mapMarkerValues[2])
          .then(() => {
            const output = this.store.state.trans.data
            if (output.message !== undefined) {
              this.error(output.message)
              return
            }
            this.inputEPSG = epsgCode.srid
            this.mapMarkerValues[0] = output.v1
            this.mapMarkerValues[1] = output.v2
            this.mapMarkerValues[2] = output.v3
            // Vi formaterer inputtet, så det ser pænt ud,
            // og gør CoordinateTransformation opmærksom på ændringen
            // så den kan fortælle Map samt Output om den nye EPSG-kode.
            this.updateInputFields()
            this.$emit('input-epsg-changed', epsgCode)
          })
      } else {
        this.store.dispatch('trans/get', this.inputEPSG + '/' + epsgCode.srid + '/' + this.mapMarkerValues[0] + ',' + this.mapMarkerValues[1])
          .then(() => {
            const transformationOutput = this.store.state.trans.data

            if (transformationOutput.message !== undefined) {
              this.error(transformationOutput.message)
              return
            }

            this.inputEPSG = epsgCode.srid
            this.mapMarkerValues[0] = transformationOutput.v1
            this.mapMarkerValues[1] = transformationOutput.v2
            this.$emit('input-epsg-changed', epsgCode)
            this.updateInputFields()
          })
      }
    },

    // Formatknapperne virker kun ved DMS
    disableRadioButtons () {
      this.degreesChecked = false
      this.minutesChecked = false
      this.secondsChecked = false
    },

    checkDegrees () {
      if (!this.degreesChecked) {
        this.degreesChecked = true
        this.minutesChecked = false
        this.secondsChecked = false
        this.updateInputFields()
      }
    },

    checkMinutes () {
      if (!this.minutesChecked) {
        this.degreesChecked = false
        this.minutesChecked = true
        this.secondsChecked = false
        this.updateInputFields()
      }
    },

    checkSeconds () {
      if (!this.secondsChecked) {
        this.degreesChecked = false
        this.minutesChecked = false
        this.secondsChecked = true
        this.updateInputFields()
      }
    }
  },

  setup (_props, { emit }) {
    // provided from map
    const mapMarkerInputCoords = inject('mapMarkerInputCoords')
    const mapMarkerValues = ref(mapMarkerInputCoords.value)

    const inputEPSG = ref('')
    const colors = inject('themeColors')
    const store = useStore()
    const firstDirection = 'first'
    const secondDirection = 'second'
    const thirdDirection = 'third'
    // Formatknapperne
    const degreesChecked = ref(false)
    const minutesChecked = ref(false)
    const secondsChecked = ref(false)
    // DMS
    const degrees = ref([0, 0])
    const minutes = ref([0, 0])
    const seconds = ref([0, 0])
    const meters = ref(0)
    const is3D = ref(true)
    // TODO: where does this get set
    const isDegrees = ref(false)
    const selected = ref('')
    // Smuksering af inputkoordinaterne i de tre til syv tastefelter
    /**
     * setting the input fields
     */
    const updateInputFields = () => {
      // if not degrees
      if (!isDegrees.value || degreesChecked.value) {
        // values to be filled into the input fields
        const deg0 = parseFloat(mapMarkerValues.value[0].toFixed(4))
        const deg1 = parseFloat(mapMarkerValues.value[1].toFixed(4))
        // filling into the input fields
        degrees.value[0] = deg0
        degrees.value[1] = deg1
        console.log(`isDegrees.value: ${isDegrees.value}`)
      } else if (minutesChecked.value) {
        console.log(`isDegrees.value: ${isDegrees.value}`)
        const deg0 = Math.floor(mapMarkerValues.value[0])
        const deg1 = Math.floor(mapMarkerValues.value[1])
        const min0 = parseFloat(((mapMarkerValues.value[0] - deg0) * 60).toFixed(4))
        const min1 = parseFloat(((mapMarkerValues.value[1] - deg1) * 60).toFixed(4))
        degrees.value[0] = deg0
        degrees.value[1] = deg1
        minutes.value[0] = min0
        minutes.value[1] = min1
      } else {
        console.log(`isDegrees.value: ${isDegrees.value}`)
        const deg0 = Math.floor(mapMarkerValues.value[0])
        const deg1 = Math.floor(mapMarkerValues.value[1])
        const min0 = Math.floor((mapMarkerValues.value[0] - deg0) * 60)
        const min1 = Math.floor((mapMarkerValues.value[1] - deg1) * 60)
        const sec0 = parseFloat(((mapMarkerValues.value[0] - deg0 - min0 / 60) * 3600).toFixed(4))
        const sec1 = parseFloat(((mapMarkerValues.value[1] - deg1 - min1 / 60) * 3600).toFixed(4))
        degrees.value[0] = deg0
        degrees.value[1] = deg1
        minutes.value[0] = min0
        minutes.value[1] = min1
        seconds.value[0] = sec0
        seconds.value[1] = sec1
      }
    }

    // Beder CoordinateTransformation om at vise en fejlmeddelselse
    // med beskeden 'err' i tre sekunder.
    const error = err => {
      emit('error-occurred', true, err)
      setTimeout(() => {
        emit('error-occurred', false)
      }, 3000)
    }

    onMounted(() => {
      // Søgefeltet til indtastning af addresser (DAWA)
      inputEPSG.value = inject('inputEPSG')
      const dawaAutocomplete2 = require('dawa-autocomplete2')
      const inputElm = document.getElementById('dawa-autocomplete-input')
      dawaAutocomplete2.dawaAutocomplete(inputElm, {
        select: function (selected) {
          selected.value = selected.tekst
          // Tranformation efter valgt addresse
          fetch('https://api.dataforsyningen.dk/adresser?q=' + selected.value)
            .then(res => res.json())
            .then(data => data[0].adgangsadresse.vejpunkt.koordinater)
            .then(coords => {
              if (is3D.value) {
                store.dispatch('trans/get', 'EPSG:4258/' + inputEPSG.value + '/' + coords[1] + ',' + coords[0] + ',' + meters.value).then(() => {
                  const output = store.state.trans.data
                  // Abort hvis fejl
                  if (output.message !== undefined) {
                    error(output.message)
                    return
                  }
                  mapMarkerValues.value[0] = output.v1
                  mapMarkerValues.value[1] = output.v2
                  mapMarkerValues.value[2] = output.v3
                  // setInput()
                  emit('input-coords-changed', [mapMarkerValues.value[0], mapMarkerValues.value[1], mapMarkerValues.value[2]])
                })
              } else {
                store.dispatch('trans/get', 'EPSG:4258/' + inputEPSG.value + '/' + coords[1] + ',' + coords[0]).then(() => {
                  const output = store.state.trans.data
                  if (output.message !== undefined) {
                    error(output.message)
                    return
                  }
                  mapMarkerValues.value[0] = output.v1
                  mapMarkerValues.value[1] = output.v2
                  // setInput()
                  emit('input-coords-changed', [mapMarkerValues.value[0], mapMarkerValues.value[1], mapMarkerValues.value[2]])
                })
              }
            })
        }
      })
    })
    updateInputFields()

    // Hold øje med kortmarkørens placering,
    // så inputkoordinaterne kan opdateres.
    watch(mapMarkerInputCoords, () => {
      mapMarkerValues.value = mapMarkerInputCoords.value
      updateInputFields()
    })

    // Hold øje med de tastefelterne til inputkoordinater,
    // skulle brugeren vælge at indtaste koordinaterne manuelt.
    watch([degrees.value, minutes.value, seconds.value], () => {
      // Sørg for at lade koordinaterne være tal og aldrig bogstaver
      // degrees.value[0] -= 0
      // degrees.value[1] -= 0
      let v1 = degrees.value[0]
      let v2 = degrees.value[1]
      if (minutesChecked.value || secondsChecked.value) {
        // minutes.value[0] -= 0
        // minutes.value[1] -= 0
        v1 += minutes.value[0] / 60
        v2 += minutes.value[1] / 60
      }
      if (secondsChecked.value) {
        // seconds.value[0] -= 0
        // seconds.value[1] -= 0
        v1 += seconds.value[0] / 3600
        v2 += seconds.value[1] / 3600
      }
      mapMarkerValues.value = [v1, v2, meters.value]
    })

    // Højdeparameteren til 3D-projektering er særskildt.
    watch(meters, () => {
      // meters.value -= 0
      mapMarkerValues.value = [mapMarkerValues.value[0], mapMarkerValues.value[1], meters.value]
    })

    // Gør CoordinateTransformation opmærksom på ændringer i inputkoordinaterne,
    // og om hvorvidt input EPGS-koden er i 3D eller 2D.
    onUpdated(() => {
      emit('is-3d-changed', is3D.value)
      emit('input-coords-changed', mapMarkerValues.value)
    })

    return {
      mapMarkerValues,
      colors,
      store,
      inputEPSG,
      minutesChecked,
      secondsChecked,
      degreesChecked,
      updateInputFields,
      degrees,
      minutes,
      seconds,
      is3D,
      isDegrees,
      meters,
      error,
      selected,
      firstDirection,
      secondDirection,
      thirdDirection
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.inputComponents {
  display: flex;
  flex-direction: row;
}
.coordinate-selection-wrapper {
  margin: 1rem 0;
}
.title-bar {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
}
input:focus {
  outline: none;
}
.hide {
  margin: 0 0 0 auto;
}
.info-icon {
  border: var(--darkSteel) solid 1px;
  border-radius: 25px;
  margin: 0 0 0 auto;
  transform: rotate(90deg);
}
li {
  list-style-type: none;
  margin: 0;
  border-bottom: var(--action) solid 1px;
}
li:hover {
  background-color: var(--action);
}
ul {
  list-style-type: none;
}
.coordinates-input {
  border-bottom: var(--action) solid 1px;
  display: inline-flex;
  flex: 1;
  width: 10%;
  margin-right: 0.5rem;
  padding-bottom: 0.25rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
}
input {
  appearance: none;
  -moz-appearance: textfield;
  border: none;
  width: 100%;
}
.arrow-icon-x-coordinate {
  transform: rotate(90deg);
}
.arrow-icon-z-coordinate {
  transform: rotate(45deg);
}
.searchbar {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 0.5rem;
  border: var(--darkSteel) solid 1px;
  border-radius: 16px;
  flex-grow: 1;
  padding: 0rem 0.75rem 0.1rem 1rem;
}
input[type=radio] {
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;
}
.radiogroup {
  display: inline-flex;
  flex-wrap: nowrap;
}
.radioGroupDisabled {
  pointer-events: none;
}
.footer {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
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
.isMetresInput {
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
}
@media screen and (max-width: 1180px) {
  .footer {
    display: inline-flex;
    margin-bottom: 0.5rem;
  }
  .searchbar {
    flex: 1;
  }
}
</style>
