#!/usr/bin/env node
const {error, semver} = require('cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

console.log(requiredVersion)
console.log(process.version)
if(semver.satisfies(process.version, requiredVersion)) {
    error(
        `You are using Node ${process.version}, but dev-server ` +
        `requires Node ${requiredVersion}. \nPlease upgrade your Node version.`
    )
    process.exit(1)
}
