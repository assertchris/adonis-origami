# Adonis Origami

Folding with style. This is an experimental take on improvements to Fold's API.

## Usage

Add autoload directives to `package.json`:

```js
"autoload": {
  "App/": "src",
  "App/Tests/": "tests"
}
```

You can create a Fold-like container, like this:

```js
var container = new (require(path + "/index"));
```

Thanks to the `package.json` autoload directives, code files can be autoloaded:

```js
var model = container.make("App/Model");
```

Ad-hoc bindings can also be created:

```js
container.bind("Foo/Bar", function() {
    return new SomeClass();
});
```

Autoloaded files, and ad-hoc bindings, can be extended:

```js
container.extend("App/Model", function(Model) {
    return new ModelDecorator(container.make(Model));
});
```

## Versioning

This library follows [Semver](http://semver.org). According to Semver, you will be able to upgrade to any minor or patch version of this library without any breaking changes to the public API. Semver also requires that we clearly define the public API for this library.

All methods are considered private and experimental unless documented either in this file or any other markdown documents. Don't depend on public method signatures or overrides unless documented or you have confirmed with one of the maintainers.
