import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-WP-Nonce'] = $BBPLikes.nonce
axios.defaults.baseURL = $BBPLikes.baseUrl + '/wp-json/bbp-likes/v1'

export default axios
