#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    generateSitemap = require('../');


var prefix = argv.prefix;
if (prefix === undefined) {
    process.stdout.write('Error: Missing Prefix.\n')
    process.stdout.write('  Eg: sitemap-static --prefix=http://www.domain.com\n')
    process.exit()
}

if (!prefix.match(/\/$/)) prefix += '/'

generateSitemap({
    findRoot: argv._[0] || '.',
    ignoreFile: argv['ignore-file'],
    prefix: prefix,
}, function(err, data) {
    if(err) {
        process.stderr.write('Error: failed to generate sitemap');
        return process.exit()
    }

    process.stdout.write(data)
});
