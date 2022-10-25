<template>
  <section class="input-coordinate">
    <div class="title-bar">
      <h3>Input</h3>
    </div>
    <section class="coordinate-selection-wrapper">
      <EpsgSelection
        :isOutput="false"
        @epsg-changed="onInputEpsgChanged"
      />
    </section>
    <div class="input">
      <!-- WIP stand alone component for all the stuf below -->
      <CordinateInputField/>

      <!-- <div class="first-input"> -->
      <span class="first-input" :class="{isDegreesInput: isDegrees, isMetresInput: !isDegrees}">
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
        <!-- COORDINATE INPUT IF DEGREES, MINUTES, SECONDS -->
        <span class="coordinate-input">
          <input
            class="coordinates"
            :class="{
              degreesInput: degreesChecked,
              metresInput: minutesChecked,
              secondsInput: secondsChecked
            }"
            type="number"
            step="0.0001"
            v-model=degrees[0]
          />
          <span class="unit" v-show="isDegrees">°N</span>
        <span class="unit" v-show="!isDegrees">m</span>
        </span>
        <!-- COORDINATE INPUT IF DEGREES && MINUTES || SECONDS -->
        <span class="coordinate-input" v-show="isDegrees && (minutesChecked || secondsChecked)">
          <input
            class="coordinates"
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=minutes[0]
            type="number"
            step="0.0001"
          />
          <span class="degrees">'</span>
        </span>
        <!-- COORDINATE INPUT IF DEGREES AND -->
        <span class="coordinate-input" v-show="isDegrees && secondsChecked">
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
      <!-- </div>
      <div class="second-input"> -->
      <span class="second-input" :class="{isDegreesInput: isDegrees, isMetresInput: !isDegrees}">
        <!-- Ombyt ikoner ved decimalgrader -->
        <Icon v-if="isDegrees"
          icon="ArrowIcon"
          :width="2"
          :height="2"
          :color="colors.turquoise"
          :stroke-width="0"
          class="arrow-icon arrow-icon-x-coordinate"
        />
        <Icon v-else
          icon="ArrowIcon"
          :width="2"
          :height="2"
          :color="colors.turquoise"
          :stroke-width="0"
          class="arrow-icon"
        />
        <span class="coordinate-input">
          <input
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=degrees[1]
            type="number"
            step="0.0001"
          />
          <span class="degrees" v-show="isDegrees">°E</span>
        <span class="degrees" v-show="!isDegrees">m</span>
        </span>
        <span class="coordinate-input" v-show="isDegrees && (minutesChecked || secondsChecked)">
          <input
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=minutes[1]
            type="number"
            step="0.0001"
          />
          <span class="degrees">'</span>
        </span>
        <span class="coordinate-input" v-show="isDegrees && secondsChecked">
          <input
            :class="{degreesInput: degreesChecked, metresInput: minutesChecked, secondsInput: secondsChecked}"
            v-model=seconds[1]
            type="number"
            step="0.0001"
          />
          <span class="degrees">"</span>
        </span>
      </span>
      <!-- </div>
      <div class="first-input"> -->
      <span class="third-input" :class="{isDegreesInput: isDegrees, isMetresInput: !isDegrees}" v-show = "is3D">
        <Icon
          icon="ArrowIcon"
          :width="2"
          :height="2"
          :color="colors.turquoise"
          :stroke-width="0"
          class="arrow-icon-z-coordinate"
        />
        <span class="coordinate-input">
          <input
            :class="{degreesInput: true}"
            v-model=meters
            type="number"
            step="0.0001"
          />
        <span class="degrees">m</span>
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
      <div class="radiogroup" :class="{radioGroupDisabled: !isDegrees}">
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
    CordinateInputField: defineAsyncComponent(() => import('@/components/coordinatetransformation/CordinateInputField'))
  },

  methods: {
    /**
     * updates the input EPSG code and updates the UI if necessary
     * @param {string} epsg
     */
    onInputEpsgChanged (epsg) { // TODO: refactor this, pls
      console.log('changed inputEPSG')
      // Decimal degrees (DD), eller DMS?
      if (epsg.v1_unit === 'degree') {
        // FIXME: this feels like doing the same thing two different places
        this.isDegrees = true
        this.checkDegrees()
      } else {
        this.isDegrees = false
        this.disableRadioButtons()
      }

      // 3D eller 2D?
      this.is3D = epsg.v3 !== null

      if (this.is3D) { // IF THE COORDINATE SYSTEM IS 3D
        this.store.dispatch('trans/get', this.inputEPSG + '/' + epsg.srid + '/' + this.inputCoords[0] + ',' + this.inputCoords[1] + ',' + this.inputCoords[2])
          .then(() => {
            const transData = this.store.state.trans.data
            console.log(`transData.message: ${transData.message}`) // TODO: this comes back as undefined?
            if (transData.message !== undefined) {
              this.error(transData.message)
              return
            }
            this.inputEPSG = epsg.srid
            this.inputCoords[0] = transData.v1
            this.inputCoords[1] = transData.v2
            this.inputCoords[2] = transData.v3
            // Vi formaterer inputtet, så det ser pænt ud,
            // og gør CoordinateTransformation opmærksom på ændringen
            // så den kan fortælle Map samt Output om den nye EPSG-kode.
          })
      } else { // IF THE COORDINATE SYSTEM IS 2D
        this.store.dispatch('trans/get', this.inputEPSG + '/' + epsg.srid + '/' + this.inputCoords[0] + ',' + this.inputCoords[1])
          .then(() => {
            const output = this.store.state.trans.data
            if (output.message !== undefined) {
              this.error(output.message)
              return
            }
            this.inputEPSG = epsg.srid
            this.inputCoords[0] = output.v1
            this.inputCoords[1] = output.v2
            // this.$emit('input-epsg-changed', epsg)
            // this.setInput()
          })
      }
      this.setInput()
      this.$emit('input-epsg-changed', epsg)
    },

    // Formatknapperne virker kun ved DMS
    /**
     * disables the radio buttons, but does not hide them
     */
    disableRadioButtons () {
      this.degreesChecked = false
      this.minutesChecked = false
      this.secondsChecked = false
    },

    /**
     * if degreesChecked is false: sets it to true and everything else to false
     * then calls setInput()
     */
    checkDegrees () {
      if (!this.degreesChecked) {
        this.degreesChecked = true
        this.minutesChecked = false
        this.secondsChecked = false
        this.setInput()
      }
    },

    /**
     * if minutesChecked is false, sets it to true and everything else to false
     * then calls setInput()
     */
    checkMinutes () {
      if (!this.minutesChecked) {
        this.degreesChecked = false
        this.minutesChecked = true
        this.secondsChecked = false
        this.setInput()
      }
    },

    /**
     * if secondsChecked is false, sets it to true and everything else to false,
     * then calls setInput()
     */
    checkSeconds () {
      if (!this.secondsChecked) {
        this.degreesChecked = false
        this.minutesChecked = false
        this.secondsChecked = true
        this.setInput()
      }
    }
  },

  setup (_props, { emit }) {
    const colors = inject('themeColors')
    const store = useStore()

    const mapMarkerInputCoords = inject('mapMarkerInputCoords')
    const mapCoords = ref(mapMarkerInputCoords.value)

    const inputEPSG = ref('')

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
    const isDegrees = ref(false)
    const selected = ref('')

    // Smuksering af inputkoordinaterne i de tre til syv tastefelter
    const setCoordinateFieldValue = () => {
      // The degrees are set no matter what
      degrees.value[0] = getDegreesFromCoords(mapCoords)[0]
      degrees.value[1] = getDegreesFromCoords(mapCoords)[1]

      if (minutesChecked.value) {
        minutes.value[0] = getMinutesFromCoords(mapCoords)[0]
        minutes.value[1] = getMinutesFromCoords(mapCoords)[1]
      } else {
        minutes.value[0] = getMinutesFromCoords(mapCoords)[0]
        minutes.value[1] = getMinutesFromCoords(mapCoords)[1]

        seconds.value[0] = getSecondsFromCoords(mapCoords)[0]
        seconds.value[1] = getSecondsFromCoords(mapCoords)[1]
      }
    }

    /**
     * calculates and rounds the degrees from the given coordinates
     * @param {[number, number]} coords
     * @returns {[number, number]} degrees
     */
    const getDegreesFromCoords = (coords) => {
      const degree0 = parseFloat(coords.value[0].toFixed(4))
      const degree1 = parseFloat(coords.value[1].toFixed(4))

      return [degree0, degree1]
    }

    /**
     * calculates the the arc minutes from the given coordinates
     * @param {[number, number]} coords
     * @return {[number, number]} arc minutes
     */
    const getMinutesFromCoords = (coords) => {
      const degree0 = Math.floor(coords.value[0])
      const degree1 = Math.floor(coords.value[1])

      const minutes0 = parseFloat(((coords.value[0] - degree0) * 60).toFixed(4))
      const minutes1 = parseFloat(((coords.value[1] - degree1) * 60).toFixed(4))

      return [minutes0, minutes1]
    }

    /**
     * calculates the arc seconds from given coordinates
     * @param {[number, number]} coords
     * @returns {[number, number]} arc seconds
     */
    const getSecondsFromCoords = (coords) => {
      const degree0 = Math.floor(coords.value[0])
      const degree1 = Math.floor(coords.value[1])

      const minutes0 = Math.floor((coords.value[0] - degree0) * 60)
      const minutes1 = Math.floor((coords.value[1] - degree1) * 60)

      const seconds0 = parseFloat(((coords.value[0] - degree0 - minutes0 / 60) * 3600).toFixed(4))
      const seconds1 = parseFloat(((coords.value[1] - degree1 - minutes1 / 60) * 3600).toFixed(4))

      return [seconds0, seconds1]
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
      const inputElement = document.getElementById('dawa-autocomplete-input')

      dawaAutocomplete2.dawaAutocomplete(inputElement, {
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
                  mapCoords.value[0] = output.v1
                  mapCoords.value[1] = output.v2
                  mapCoords.value[2] = output.v3
                  setCoordinateFieldValue()
                  emit('input-coords-changed', [mapCoords.value[0], mapCoords.value[1], mapCoords.value[2]])
                })
              } else {
                store.dispatch('trans/get', 'EPSG:4258/' + inputEPSG.value + '/' + coords[1] + ',' + coords[0]).then(() => {
                  const output = store.state.trans.data
                  if (output.message !== undefined) {
                    error(output.message)
                    return
                  }
                  mapCoords.value[0] = output.v1
                  mapCoords.value[1] = output.v2
                  setCoordinateFieldValue()
                  emit('input-coords-changed', [mapCoords.value[0], mapCoords.value[1], mapCoords.value[2]])
                })
              }
            })
        }
      })
    })
    setCoordinateFieldValue()

    // Hold øje med kortmarkørens placering,
    // så inputkoordinaterne kan opdateres.
    watch(mapMarkerInputCoords, () => {
      mapCoords.value = mapMarkerInputCoords.value
      setCoordinateFieldValue()
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
      mapCoords.value = [v1, v2, meters.value]
    })

    // Højdeparameteren til 3D-projektering er særskildt.
    watch(meters, () => {
      // meters.value -= 0
      mapCoords.value = [mapCoords.value[0], mapCoords.value[1], meters.value]
    })

    // Gør CoordinateTransformation opmærksom på ændringer i inputkoordinaterne,
    // og om hvorvidt input EPGS-koden er i 3D eller 2D.
    onUpdated(() => {
      emit('is-3d-changed', is3D.value)
      emit('input-coords-changed', mapCoords.value)
    })

    return {
      inputCoords: mapCoords,
      colors,
      store,
      inputEPSG,
      minutesChecked,
      secondsChecked,
      degreesChecked,
      setInput: setCoordinateFieldValue,
      degrees,
      minutes,
      seconds,
      is3D,
      isDegrees,
      meters,
      error,
      selected
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
.coordinate-selection-wrapper {
  display: flex;
  align-items: center;
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
.coordinate-input {
  border-bottom: var(--action) solid 1px;
  display: flex;
  flex: 1;
  margin-right: 1rem;
  padding-bottom: 0.25rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input {
  -moz-appearance: textfield;
  border: none;
  display: flex;
  flex: 1;
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
  width: 100%;
  align-items: center;
}
.first-input, .second-input, .third-input {
  width: 100%;
  /* flex-grow: 1; */
}
.input .isMetresInput {
  flex-grow: 1;
}
.isMetresInput {
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
}
@media screen and (max-width: 1180px) {
  .metresInput {
    width: 1%;
  }
  .secondsInput {
    width: 1%;
  }
  .footer {
    display: inline-block;
  }
  .searchbar {
    margin-bottom: 1.5rem;
    width: 100%;
  }
}
</style>
