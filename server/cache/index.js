require('dotenv').config()
const Promise = require('bluebird')
const redis = Promise.promisifyAll(require('redis'))

const cache = redis.createClient(process.env.CACHE_URI)

cache.auth(process.env.CACHE_PW, err => {
  if (err) throw err
})

cache.on('connect', () => {
  console.log('Connected to cache')
})

cache.on('error', (err) => {
  console.log('Error connecting to cache' + err)
})

module.exports = cache
