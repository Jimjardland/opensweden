const { knuthShuffle } = require('knuth-shuffle')

module.exports = {
  generateVerificationCode (len = 6) {
    const seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const pinCodeArray = []

    for (let i = 0; i < len; i++) {
      const [random] = knuthShuffle(seed.slice(0))
      pinCodeArray.push(random)
    }
    return pinCodeArray.join('')
  }
}
