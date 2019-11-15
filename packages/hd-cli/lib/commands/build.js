module.exports = (api) => {
  api.registerCommand('build', {
    description: 'build for production',
    usage: 'hd-cli build [options] [entry|pattern]',
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
