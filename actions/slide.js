import axios from 'axios'

export const getSlides = (host = '') => {
  return axios.get(host + '/api/v1/slide').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
