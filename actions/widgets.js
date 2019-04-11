import axios from 'axios'

export const addWidget = (type, host = '') => {
  return axios.post(host + '/api/v1/widgets', {
    type
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
