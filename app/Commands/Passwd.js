'use strict'

const Command = use('Command')
const Hash = use('Hash')
const Env = use('Env')

class Passwd extends Command {

  get signature () {
    return 'passwd'
  }

  get description () {
    return 'Generate password hash'
  }

  * handle (args, options) {
    const password = yield this.secure('Enter password').print()
    const hashedPassword = yield Hash.make(password)

    this.info(hashedPassword)
  }

}

module.exports = Passwd
