import axios, { AxiosStatic } from 'axios'

import * as Config from '../config'

export default function(nonce: string): AxiosStatic {
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['X-WP-Nonce'] = nonce
  axios.defaults.baseURL = Config.BASE_URI + '/wp-json/bbp-likes/v1'
  return axios
}
