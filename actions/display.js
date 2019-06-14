import axios from 'axios'

export const getDisplays = (host = '') => {
  return axios.get(host + '/api/v1/display').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const addDisplay = (host = '') => {
  return axios.post(host + '/api/v1/display').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const getDisplay = (id, host = '') => {
  return axios.get(host + '/api/v1/display/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteDisplay = (id, host = '') => {
  return axios.delete(host + '/api/v1/display/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const updateDisplay = (id, data, host = '') => {
  return axios.patch(host + '/api/v1/display/' + id, data).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
