String.prototype.withDottedPrefix = function (this: string) {
    return "." + this;
}
String.prototype.removeWords = function (this: string, words: string[]) {
    if (!words || words.length == 0) {
        throw "Invalid word array!";
    }

    var result: string = this;
    for (const word of words) {
        const regex = new RegExp(word, "g");
        result = result.replace(regex, "");
    }

    return result;
}