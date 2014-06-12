#!/usr/bin/env node

var findit = require('findit'),
    argv = require('minimist')(process.argv.slice(2));

var finder = findit(argv._[0] || '.');
var prefix = argv.prefix;
if (prefix == undefined) {
	process.stdout.write('Error: Missing Prefix.\n')
	process.stdout.write('  Eg: sitemap-static --prefix=http://www.domain.com\n')
	process.exit()
}

// add the trailing slash to the prefix if it's not there.
if (prefix.substr(prefix.length-1) != '/')
	prefix += '/'

var ignore_file = argv['ignore-file'];
var ignore = []
var ignore_folders = []

if (ignore_file) {
	ignore = require(process.cwd() + '/' + ignore_file);
	var len = ignore.length
	for (var i = 0; i < len; i++) {
		var l = ignore[i].length
		if (ignore[i].substr(l-5) !== '.html') {
			ignore_folders.push(new RegExp(ignore[i]))
		}
	}
}

process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>');
process.stdout.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

finder.on('file', function(file, stat) {
    if (file.indexOf('.html') === -1) return;
    if (ignore.indexOf(file) !== -1) return;
    for (var i =0; i<ignore_folders.length; i++) {
    	if (file.match(ignore_folders[i])) return;
    }
    process.stdout.write('<url>\n');
    process.stdout.write('<loc>');
    process.stdout.write(prefix + file);
    process.stdout.write('</loc>\n');
    process.stdout.write('</url>\n');
});

finder.on('end', function(file, stat) {
    process.stdout.write('</urlset>');
});
