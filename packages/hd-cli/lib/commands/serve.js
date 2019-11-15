module.exports = (api) => {
    api.registerCommand('serve', {
        description: 'start development server',
        usage: 'hd-cli serve [options] [entry]'
    }, function serve(args) {
        
    })
}

module.exports.defaultModes = {
    serve: 'development'
  }