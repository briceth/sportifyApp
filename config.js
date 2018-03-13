const env = process.env.NODE_ENV || 'development'

const config = {
  ENV: env,
  API_URL: 'http://localhost:3100'
}

if (env === 'production') {
  config.API_URL = 'production url to provide'
}

export default config
