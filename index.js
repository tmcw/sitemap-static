var findit = require('findit'),
    argv = require('minimist')(process.argv.slice(2));

var finder = findit(argv._[0] || '.');
var prefix = argv.prefix;

process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>');
process.stdout.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

finder.on('file', function(file, stat) {
    if (file.indexOf('.html') === -1) return;
    process.stdout.write('<url>\n');
    process.stdout.write('<loc>');
    process.stdout.write(prefix + file);
    process.stdout.write('</loc>\n');
    process.stdout.write('</url>\n');
});

finder.on('end', function(file, stat) {
    process.stdout.write('</urlset>');
});
