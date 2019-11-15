module.exports = (api) => {
    api.registerCommand('create', {
      description: 'create project from template',
      usage: 'hd-cli create <project-name> [options]',
    }, args => {
    
    })
  }
  
  module.exports.defaultModes = {
    build: 'development'
  }
  