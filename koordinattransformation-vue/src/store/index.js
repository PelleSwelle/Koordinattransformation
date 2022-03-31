import
/* webpackChunkName: "Vuex" */
/* webpackPreload: true */
Vuex from 'vuex'

import { Koortrans } from '@/store/shared/Koortrans'
import { CRS } from '@/store/koortransAPI/CRS'
import { CRSInformation } from '@/store/koortransAPI/CRSInformation'

export default Vuex.createStore({
  modules: {
    Koortrans,
    CRS,
    CRSInformation
  }
})
