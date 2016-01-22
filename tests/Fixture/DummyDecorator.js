function DummyDecorator(dummy) {
    this.dummy = dummy;
}

DummyDecorator.prototype.func = function() {
    return this.dummy.func().toUpperCase();
};

module.exports = DummyDecorator;
