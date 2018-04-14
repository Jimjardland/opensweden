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
  }
})

module.exports = {
  port: nconf.get('port'),
  sms: nconf.get('sms')
}