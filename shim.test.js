var path = require('path');
var sassTrue = require('sass-true');
var glob = require('glob');

describe('Sass', () => {
    var sassTestFiles = glob.sync(path.resolve(process.cwd(), 'scss/tests/**/*.tests.scss'));

    sassTestFiles.forEach(file => sassTrue.runSass({ file }, describe, it));
})