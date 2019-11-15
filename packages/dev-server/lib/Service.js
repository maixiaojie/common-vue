const { error } = require('../../cli-shared-utils')
const pluginAPI = require('./PluginAPI')
module.exports = class Service {
    constructor(context) {
        this.context = context
        this.commands = {}
        this.plugins = this.resolvePlugins()
        this.modes = this.plugins.reduce((modes, { apply: { defaultModes } }) => {
            return Object.assign(modes, defaultModes)
        }, {})
    }
    resolvePlugins() {
        const idToPlugin = id => ({
            id: id.replace(/^.\//, 'build-in:'),
            apply: require(id)
        })
        let plugins

        const buildInPlugins = [
            './commands/serve',
            './commands/build',
            './commands/inspect',
            './commands/help'
        ].map(idToPlugin)
        // TODO: 如果有其他的，可以合并进来
        plugins = buildInPlugins

        return plugins;
    }
    init() {
        // apply plugins
        this.plugins.forEach(({ id, apply }) => {
            apply(new pluginAPI(id, this))
        })
    }
    async run(name, args = {}, rawArgv = []) {
        // 如果存在 --mode 就取改值
        // 如果不存在 判断 --watch 是否存在， 若存在，则为 development, 不存在，根据 命令去判断
        const mode = args.mode || (name === 'build' && args.watch ? 'development' : this.modes[name]);

        this.init();

        args._ = args._ || []
        let command = this.commands[name]
        if (!command && name) {
            error(`command ${name} does not exist.`)
            process.exit(1)
        }
        if (!command || args.help || args.h) {
            command = this.commands.help
        }
        const { fn } = command
        return fn(args, rawArgv)


    }
}