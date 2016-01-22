function Container() {
    var fold = require("adonis-fold");
    var path = require("app-root-path");
    var config = require(path + "/package.json");

    delete GLOBAL.use;
    delete GLOBAL.make;

    if (config.autoload) {
        for (var key in config.autoload) {
            if (config.autoload.hasOwnProperty(key)) {
                fold.Ioc.autoload(key, path + "/" + config.autoload[key]);
            }
        }
    }

    this.fold = fold;
    this.path = path;
    this.config = config;
}

Container.prototype.use = function(key) {
    return this.fold.Ioc.use(key);
};

Container.prototype.make = function(key) {
    return this.fold.Ioc.make(key);
};

Container.prototype.bind = function(key, factory) {
    this.fold.Ioc.bind(key, factory);
    return this;
};

Container.prototype.extend = function(key, factory) {
    var original = this.fold.Ioc.use(key);
    return this.fold.Ioc.bind(key, factory.bind(this, original));
};

module.exports = Container;
