import axios from 'axios'

export const getSlideshows = (host = '') => {
  return axios.get(host + '/api/v1/slideshow').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
