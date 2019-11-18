const ora = require('ora');
const chalk = require('chalk');

const spinner = ora();

let lastMsg = null;

const logWithSpinner = (symbol, msg) => {
    if(!msg) {
        msg = symbol
        symbol = chalk.green('✔')
    }
    if(lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text
        })
    }
    spinner.text = ' ' + msg
    lastMsg = {
        symbol: symbol + ' ',
        text: msg
    }
    spinner.start();
}
const stopSpinner = (msg, persist = true) => {
    if(lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: msg
        })
    }else {
        spinner.stop();
    }
    lastMsg = null;

}
exports.logWithSpinner = logWithSpinner;
exports.stopSpinner = stopSpinner;