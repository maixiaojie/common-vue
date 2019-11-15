#!/usr/bin/env node
// const {error, semver} = require('cli-shared-utils')
const {error, semver} = require('../../cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

if(!semver.satisfies(process.version, requiredVersion)) {
    error(
        `You are using Node ${process.version}, but dev-server ` +
        `requires Node ${requiredVersion}. \nPlease upgrade your Node version.`
    )
    process.exit(1)
}

const Service = require('../lib/Service')
const service = new Service(process.cwd());
let rawArgv = process.argv.slice(2);
const args = require('minimist')(rawArgv, {
    boolean: []
})

const command = args._[0]
service.run(command, args, rawArgv).catch(err => {
    error(err)
    process.exit(1)
})