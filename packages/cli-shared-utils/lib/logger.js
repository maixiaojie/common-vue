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
const info = (msg, tag = null) => {
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), chalk.green(msg)))
}
const warn = (msg, tag = null) => {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)))
}

exports.error = error
exports.info = info