import boxen from 'boxen'
import dotenv from 'dotenv'

const dotenvConfig = process.env.ENVIRON !== 'HEROKU' ? dotenv.config() : { parsed: {} }

if (dotenvConfig.error) {
  console.error(
    `Welcome to digital-signage!\n
You have not configured your installation yet, please run the setup utility by executing:\n` +
      boxen('$   npm run setup', { padding: 1, margin: 1, borderStyle: 'double' })
  )
  process.exit()
}

const PORT = process.env.PORT || dotenvConfig.parsed.PORT || 3002
const ENVIRON = process.env.ENVIRON || dotenvConfig.parsed.ENVIRON || 'DEV'
const MONGODB_URI =
  process.env.MONGODB_URI || dotenvConfig.parsed.MONGODB_URI || 'mongodb://localhost/display'
const SESSION_SECRET = process.env.SESSION_SECRET || dotenvConfig.parsed.SESSION_SECRET
const HOST_URL = process.env.SERVER_HOST || dotenvConfig.parsed.SERVER_HOST || 'http://localhost:3000/'

export default {
  ENVIRON,
  PORT,
  MONGODB_URI,
  SESSION_SECRET,
  HOST_URL
}
