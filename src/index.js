import 'core-js/modules/es.array.concat'
import 'core-js/modules/es.array.from'
import 'core-js/modules/es.array.index-of'
import 'core-js/modules/es.array.iterator'
import 'core-js/modules/es.array.map'
import 'core-js/modules/es.number.to-fixed'
import 'core-js/modules/es.object.to-string'
import 'core-js/modules/es.parse-int'
import 'core-js/modules/es.promise'
import 'core-js/modules/es.regexp.exec'
import 'core-js/modules/es.string.iterator'
import 'core-js/modules/es.string.replace'
import 'core-js/modules/es.string.split'
import 'core-js/modules/web.dom-collections.iterator'
import 'regenerator-runtime/runtime'

import main from './main'

window.addEventListener('load', e => {
  return new Promise(res => res(main($BBPLikes)))
})
