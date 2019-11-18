const shell = require('shelljs')
const exists = require('fs').existsSync
const { logWithSpinner, stopSpinner, chalk, error, info } = require('../../../cli-shared-utils')

const repoUrl = 'git@git.hundun.cn:web/base/h5-template.git';

module.exports = (api) => {
    api.registerCommand('create', {
        description: 'create project from template',
        usage: 'hd-cli create <project-name> [options]',
    }, async args => {
        let projectName = args._[0];
        if (projectName) {
            try {
                const cwd = api.service.context
                logWithSpinner('downloading template...')
                await downloadTemplate(`${repoUrl}`, cwd, projectName)
                stopSpinner('download template successful.')
                info(`init project ${projectName} successful.`)
                console.log(`add next, you can: \n${chalk.cyan(`cd ${projectName}`)}\n${chalk.cyan('yarn install')} \n${chalk.cyan('yarn run dev')}`)
            } catch (e) {
                error(e, 'download')
            }
        } else {
            error(`project-name is necessary😝`, 'validation')
            info(`try to tpye "hd-cli help create" for helps.`)
        }


    })
}

const downloadTemplate = (repo, pwd, name) => {
    if (exists(`${pwd}/${name}`)) {
        shell.rm('-rf', `${pwd}/${name}`)
    }

    return new Promise((resolve, reject) => {
        shell.cd(pwd)
        shell.exec(`git clone --depth=1 ${repo} ${name}`, { silent: true }, (code, stdout, stderr) => {
            if (code === 0) {
                // 删除 .git 配置
                shell.rm('-rf', `${pwd}/${name}/.git`)
                resolve('success')
            } else {
                reject(stderr)
            }
        })
    })


}

module.exports.defaultModes = {
    build: 'development'
}
