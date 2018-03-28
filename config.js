let env = process.env.NODE_ENV || 'development'
<<<<<<< HEAD
env = 'production'
=======
// env = 'production'
>>>>>>> 4851aeb88e82fb009484090c9e7712228b5e52d3

const config = {
  ENV: env,
  API_URL: 'http://localhost:3100'
}

if (env === 'production') {
  config.API_URL = 'https://sportify-reacteur.herokuapp.com'
}

export default config
