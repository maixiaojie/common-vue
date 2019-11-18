const shell = require('shelljs')
const exists = require('fs').existsSync
const { chalk, error } = require('../../../cli-shared-utils')

module.exports = (api) => {
    api.registerCommand('create', {
        description: 'create project from template',
        usage: 'hd-cli create <project-name> [options]',
    }, async args => {
        console.log(args)
        let projectName = args._[0];
        console.log(projectName)
        if(projectName) {
            try {
                const cwd = api.service.context
                await downloadTemplate(`git@git.hundun.cn:web/base/h5-template.git`, cwd, projectName)
            }catch(e) {
                error(e, 'download')
            }
            
        }else {
            error(`project-name is necessary😝
            try "hd-cli help create" to get helps.
            `, 'cli')
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
                console.log(chalk.green('download template successfuly'))
                // 删除 .git 配置
                shell.rm('-rf', `${pwd}/${name}/.git`)
                resolve('success')
            } else {
                console.log(chalk.red('download template failed'))
                reject(stderr)
            }
        })
    })


}

module.exports.defaultModes = {
    build: 'development'
}
