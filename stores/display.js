const ReactEasyState = require('react-easy-state')
const store = ReactEasyState.store

const display = store({
  id: null,
  setId(id) {
    if (!id) return
    display.id = id
  }
})

module.exports = display
