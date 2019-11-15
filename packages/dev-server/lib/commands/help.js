const padEnd = require('string.prototype.padend')
const { chalk } = require('../../../cli-shared-utils')
const getPadLength = require('../../utils')
module.exports = (api) => {
    api.registerCommand('help', args => {
        const commandName = args._[0]
        if (!commandName) {
            loadMainHelp()
        } else {

        }
    })

    function loadMainHelp() {
        console.log(
            `\n Usage: hd-cli <command> [options] \n` +
            `\n Commands: \n`
        )
        const commands = api.service.commands
        const padLength = getPadLength(commands)
        for (const name in commands) {
            if (name !== 'help') {
                const opts = commands[name].opts || {}
                console.log(`   ${
                    chalk.blue(padEnd(name, padLength))
                    }${
                    opts.description || ''
                    }`)
            }
        }
        console.log(`   \n run ${
            chalk.green(`hd-cli help [command]`)
        } for usage of a specific command. \n`)
    }
}