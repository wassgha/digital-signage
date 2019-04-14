const dotenv = process.env.ENVIRON !== 'PROD' ? require('dotenv').config() : { parsed: {} }

if (dotenv.error) {
  throw dotenv.error
}

const PORT = process.env.PORT || dotenv.parsed.PORT || 3001
const ENVIRON = process.env.ENVIRON || dotenv.parsed.ENVIRON || 'DEV'
const MONGODB_URI =
  process.env.MONGODB_URI || dotenv.parsed.MONGODB_URI || 'mongodb://localhost/display'
const SESSION_SECRET = process.env.SESSION_SECRET || dotenv.parsed.SESSION_SECRET
const HOST_URL = process.env.SERVER_HOST || dotenv.parsed.SERVER_HOST || 'http://localhost:3000/'

module.exports = {
  ENVIRON,
  PORT,
  MONGODB_URI,
  SESSION_SECRET,
  HOST_URL
}
