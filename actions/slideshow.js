import axios from 'axios'

export const getSlideshows = (host = '') => {
  return axios.get(host + '/api/v1/slideshow').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const addSlideshow = (host = '') => {
  return axios.post(host + '/api/v1/slideshow').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const getSlideshow = (id, host = '') => {
  return axios.get(host + '/api/v1/slideshow/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteSlideshow = (id, host = '') => {
  return axios.delete(host + '/api/v1/slideshow/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const updateSlideshowName = (id, host = '', title) => {
  return axios.patch(host + '/api/v1/slideshow/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
