$.fn.extend({
    exists: function (this: JQuery) {
        return this.length > 0;
    },
    notExists: function (this: JQuery) {
        return this.length === 0;
    }
});