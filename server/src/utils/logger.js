const pino = require('pino')
const pretty = require('pino-pretty')

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: 'time,hostname,pid',
})

const logger = pino(
  {
    name: 'CSLogger',
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  },
  stream,
)

module.exports = logger
