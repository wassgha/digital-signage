function broadcastUpdate(req, res) {
  res.io.emit('admin:update')
  return Promise.resolve()
}

module.exports = {
  broadcastUpdate
}
