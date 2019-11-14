const chalk = require('chalk');
const padStart = require('string.prototype.padstart')

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

const format = (label, msg) => {
    return msg.split('\n').map((line, i) => {
        return i === 0 ?
            `${label} ${line}` :
            padStart(line, chalk.reset(label).length)
    }).join('\n')
}

const error = (msg, tag = null) => {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
}
exports.error = error