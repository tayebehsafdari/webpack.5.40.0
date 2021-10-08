const notifier = require('node-notifier');

class HelloWorldPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        // console.log(this.options);
        compiler.hooks.done.tap('Hello World Plugin', (stats) => {
            // console.log('Hello World!');
            // notifier.notify('Message');
            // console.log("stats: ", stats);
            let time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
            notifier.notify({
                title: 'webpack',
                message: `webpack is done in ${time}.`
            });
        });
    }
}

module.exports = HelloWorldPlugin;