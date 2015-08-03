'use strict';
var findit = require('findit');

module.exports = function(write, o) {
  // accepts
  //
  // write - stream writer
  // {
  //   findRoot - string
  //   ignoreFile - string
  //   prefix - string
  // }
  var finder = findit(o.findRoot);

  var ignore_file = o.ignoreFile;
  var ignore = []
  var ignore_folders = []

  write('<?xml version="1.0" encoding="UTF-8"?>');
  write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  if (ignore_file) {
      ignore = require(process.cwd() + '/' + ignore_file);
      var len = ignore.length
      for (var i = 0; i < len; i++) {
          var l = ignore[i].length
          if (ignore[i].substr(l-5) !== '.html') {
              ignore_folders.push(new RegExp('^' + ignore[i]))
          }
      }
  }

  finder.on('file', function(file, stat) {
      function indent(level) {
          var space = '    ';
          var str = '';
          for (var i = 0; i < level; i++) {
            str += space;
          }
          return str;
      }

      if (file.indexOf('.html') === -1 ||
          ignore.indexOf(file) !== -1) return;
      for (var i = 0; i < ignore_folders.length; i++) {
          if (file.match(ignore_folders[i])) return;
      }

      write(indent(1) + '<url>\n' + indent(2) +
        '<loc>' + o.prefix + file + '</loc>\n' +
        indent(1) + '</url>');
  });

  finder.on('end', function(file, stat) {
      write('</urlset>');
  });
};
