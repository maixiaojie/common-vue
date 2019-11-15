module.exports = (api) => {
  api.registerCommand('inspect', {
    description: 'inspect internal config',
    usage: 'hd-cli inspect [options] [...paths]'
  }, args => {
  })
}
module.exports.defaultModes = {
  inspect: 'development'
}