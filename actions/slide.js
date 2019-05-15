import axios from 'axios'

export const getSlides = (slideshow, host = '') => {
  return axios.get(host + '/api/v1/slideshow/' + slideshow + '/slides').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const getSlide = (slide, host = '') => {
  return axios.get(host + '/api/v1/slide/' + slide).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteSlide = (id, host = '') => {
  return axios.delete(host + '/api/v1/slide/' + id)
}

export const updateSlide = (id, file, data, host = '') => {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  if (file) formData.append('data', file)
  return axios.patch(host + '/api/v1/slide/' + id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const addSlide = (slideshow, file, data, host = '') => {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  if (file) formData.append('data', file)
  formData.append('slideshow', slideshow)
  return axios.post(host + '/api/v1/slide', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const standaloneUpload = (file, host = '') => {
  const formData = new FormData()
  formData.append('data', file)
  return axios.post(host + '/api/v1/slide/standalone_upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
