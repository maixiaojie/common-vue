module.exports = (api) => {
  api.registerCommand('release', {
    description: 'release project',
    usage: 'hd-cli release [options]',
  }, args => {
    const commandName = args._[0]
    if (!commandName) {
    } else {

    }
  })
}

module.exports.defaultModes = {
  build: 'production'
}
