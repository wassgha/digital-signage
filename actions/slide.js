import axios from 'axios'

export const getSlides = (host = '') => {
  return axios.get(host + '/api/v1/slide').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteSlide = (id, host = '') => {
  return axios.delete(host + '/api/v1/slide/' + id)
}

export const updateSlide = (id, data, host = '') => {
  return axios.put(host + '/api/v1/slide/' + id, data)
}
