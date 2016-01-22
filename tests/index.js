var assert = require("assert");
var path = require("app-root-path");

// get a new container instance

var container = new (require(path + "/index"));

// check that the globals have been removed

assert(typeof use === "undefined");
assert(typeof make === "undefined");

// check that files can be autoloaded

var dummy1 = container.make("Origami/Tests/Fixture/Dummy");

assert(typeof dummy1 === "object");

// check that the object is an instance of the "class"

var Dummy = container.use("Origami/Tests/Fixture/Dummy");

assert(dummy1.constructor === Dummy);
assert(dummy1.func() === "dummy");

// check that ad-hoc bindings work

container.bind("Foo/Bar", function() {
    return new Dummy();
});

var dummy2 = container.make("Foo/Bar");

assert(typeof dummy2 === "object");
assert(dummy2.constructor === Dummy);
assert(dummy2.func() === "dummy");

// check that bindings can be extended

var DummyDecorator = container.use("Origami/Tests/Fixture/DummyDecorator");

container.extend("Foo/Bar", function(previous) {
    return new DummyDecorator(container.make(previous));
});

var dummy3 = container.make("Foo/Bar");

assert(typeof dummy3 === "object");
assert(dummy3.constructor === DummyDecorator);
assert(dummy3.func() === "DUMMY");
