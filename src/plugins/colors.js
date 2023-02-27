const colorTemplate = {
    sdfi_turquoise:         'hsl(186,100%,33%)',
    sdfi_darkTurquoise:     'hsl(186,100%,12%)',
    sdfi_vibrantSteel:      'hsla(186,40%,82%,0.7)',
    sdfi_darkSteel:         'hsla(186,25%,64%,0.6)',
    sdfi_mediumSteel:       'hsl(186,25%,91%)',
    sdfi_lightSteel:        'hsl(186,25%,96%)',
    sdfi_black:             'hsl(0,0%,0%)',
    sdfi_transparentBlack:  'hsla(0,0%,0%,0.65)',
    sdfi_action:            'hsl(171,70%,55%)',
    sdfi_white:             'hsl(0,0%,100%)',
    sdfi_highlight:         'hsl(26,80%,56%)',
    sdfi_warning:           'hsl(0,100%,66%)',

    // Primaries
    // turquoise: '#0097A7',
    // white: '#FFF',
    // black: '#000',
    // dark: '#333',
    // black2: 'rgba(0, 0, 0, 0.65)',
    // lightGrey: 'rgba(0, 0, 0, 0.25)',
    // // Interaction
    // action: '#3EDDC6',
    // action2: 'rgba(62, 221, 198, 1)',
    // action2Transparent: 'rgba(62, 221, 198, 0)',
    // actionStroke: '#66AC9E',
    // highlight: 'rgba(233, 132, 54, 0.6)',
    // highlight2: '#E98436',
    // warning: '#FF5252',
    // // Layout
    // darkTurquoise: '#045C65',
    // darkTurquoise3: '#002226',
    // // Layout
    // lightSteel: '#EDF2F2',
    // mediumSteel: '#E1ECED',

    // darkSteel: 'rgba(143, 177, 181, 0.6)',
    // darkSteel2: 'rgba(143, 177, 181, 0.8)',
    // // Web Apps
    // webApp1: '#8D2B8E',
    // webApp2: '#AB2D5C',
    // webApp3: '#C04931',
    // webApp4: '#C46F15',
    // webApp5: '#B2940E',
    // webApp6: '#8DAC20',
    // webApp7: '#5FB246',
    // // File formats
    // webserviceRaster: '#FAF2E8',
    // webserviceRasterStroke: '#D98E2B',
    // downloadRaster: '#FAF6E9',
    // downloadRasterStroke: '#D8B12B',
    // pdf: '#F9FAE9',
    // pdfStroke: '#C1CC29',
    // webserviceVector: '#F7FBED',
    // webserviceVectorStroke: '#9FCC49',
    // downloadVectorGIS: '#F4FBF1',
    // downloadVectorGISStroke: '#88CC6A',
    // special: '#F2F9F5',
    // specialStroke: '#7BC59E',
    // webserviceWCS: '#F0F6F9',
    // webserviceWCSStroke: '#70A4C9',
    // pointCloud: '#F1F2FC',
    // pointCloudStroke: '#717BE2',
    // webserviceRest: '#F2EEFC',
    // webserviceRestStroke: '#7C59E0',
    // ortoPhoto: '#F4ECF8',
    // ortoPhotoStroke: '#9340BF',
    // downloadVectorCAD: '#F5EAF3',
    // downloadVectorCADStroke: '#AE3D8A',
    // text: '#F9EDEE',
    // textStroke: '#C54D59',
    // subscription: '#FBF0EB',
    // subscriptionStroke: '#D86B37',
    // // Uncategorised
    // background: '#F2F7F7',
    // background2: '#F0F4F4',
    // otherSteel: '#E4ECED',
    // teal: '#2E9989',
    // transparent: 'rgba(0, 0, 0, 0)',
    linkedin: '#0977B4',
    twitter: '#1DA1F2',
    youtube: '#F00'
}

;((d, colors) => {
    const styleEl = document.createElement('style')
    document.head.appendChild(styleEl)
    let rules = ':root {'
        for (const [key, value] of Object.entries(colors)) {
            rules += '--' + key + ':' + value + ';\n'
        }
    rules += '}'
    styleEl.sheet.insertRule(rules, 0)
})(document, colorTemplate)

export default {
    install: (app) => {
        app.config.globalProperties.$themeColors = colorTemplate
        app.provide('themeColors', colorTemplate)
    }
}
/*
 * Colors can now be referenced in CSS as :
 *  a { background-color: var(--turquoise); }
 *
 * Or in Vue JS as :
 *  this.$themeColors.turquoise
 *
 * In Vue 3
 * import { inject } from 'vue'
 * setup(){
 *  const colors = inject('themeColors')
 * }
 */
