import axios from 'axios'

export const addWidget = (type, data = {}, host = '') => {
  return axios.post(host + '/api/v1/widgets', {
    type,
    data
  })
}

export const getWidgets = (host = '') => {
  return axios.get(host + '/api/v1/widgets').then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}

export const deleteWidget = (id, host = '') => {
  return axios.delete(host + '/api/v1/widgets/' + id)
}

export const updateWidget = (id, data, host = '') => {
  return axios.put(host + '/api/v1/widgets/' + id, data)
}

export const getWidget = (id, host = '') => {
  return axios.get(host + '/api/v1/widgets/' + id).then(res => {
    if (res && res.data) {
      return res.data
    }
  })
}
