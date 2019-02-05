/// <reference path="../../node_modules/reflect-metadata/index.d.ts"/>
var Gmf;
/// <reference path="../../node_modules/reflect-metadata/index.d.ts"/>
(function (Gmf) {
    var IoC;
    (function (IoC) {
        IoC.Injector = new /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.resolve = function (target) {
                var tokens = (Reflect.getMetadata('design:paramtypes', target) || []);
                var injections = tokens.map(function (token) { return IoC.Injector.resolve(token); });
                return new (target.bind.apply(target, [void 0].concat(injections)))();
            };
            return class_1;
        }());
        IoC.Injectable = function () {
            return function (target) {
                // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
            };
        };
    })(IoC = Gmf.IoC || (Gmf.IoC = {}));
})(Gmf || (Gmf = {}));
//# sourceMappingURL=gmf-injector.js.map