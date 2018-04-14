const nconf = require('nconf')
  .env({
    separator: '__',
    lowerCase: true
  })
  .file({
    file: 'config.json',
    dir: '../',
    search: true
  })

nconf.defaults({
  port: 4004,
  environment: 'develop',
  sms: {
    from: '71220',
    customerid: '',
    customerpassword: '',
    username: '',
    password: '',
    endpoint: ''
  },
  database: {
    user: 'user',
    password: 'password',
    database: 'opensweden',
    host: 'localhost',
    port: 5432,
    timeout: 30000
  },
  here: {
    appId: '2q1AZGFuRIT4wolY7Sz4',
    appCode: 'o6SVfYMM00vKy27-FjCAGw'
  }
})

module.exports = {
  port: nconf.get('port'),
  sms: nconf.get('sms'),
  database: nconf.get('database'),
  here: nconf.get('here')
}