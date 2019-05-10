function broadcastUpdate(io) {
  io.emit('admin:update')
  return Promise.resolve()
}

function broadcastUpdateMiddleware(req, res) {
  return broadcastUpdate(res.io)
}

module.exports = {
  broadcastUpdate,
  broadcastUpdateMiddleware
}
