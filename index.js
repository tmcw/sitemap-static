'use strict';
var findit = require('findit');
var path = require('path');

var header = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

function indent(level) {
    var space = '    ';
    var str = '';
    for (var i = 0; i < level; i++) {
      str += space;
    }
    return str;
}

module.exports = function(stream, o) {
  // accepts
  //
  // write - stream writer
  // {
  //   findRoot - string
  //   ignoreFile - string
  //   prefix - string
  // }
  o = o || {};

  var finder = findit(o.findRoot || '.');

  var prefix = o.prefix || '';
  var ignore_file = o.ignoreFile || '';
  var pretty = o.pretty || false;
  var ignore = [];
  var ignore_folders = [];

  stream.write(header);

  if (ignore_file) {
      ignore = require(process.cwd() + '/' + ignore_file);
      var len = ignore.length;
      for (var i = 0; i < len; i++) {
          var l = ignore[i].length;
          if (ignore[i].substr(l - 5) !== '.html') {
              ignore_folders.push(new RegExp('^' + ignore[i]));
          }
      }
  }

  finder.on('file', function(file /*, stat */) {

      if (file.indexOf('.html') === -1 || ignore.indexOf(file) !== -1) {
        return;
      }

      for (var i = 0; i < ignore_folders.length; i++) {
          if (file.match(ignore_folders[i])) return;
      }

      var filepath = path.relative(o.findRoot, file);

      if (pretty) {
        if (path.basename(filepath) === 'index.html') {
          var dir = path.dirname(filepath);
          filepath = dir === '.' ? '' : dir;
        } else {
          filepath = path.join(
            path.dirname(filepath),
            path.basename(filepath, '.html')
          );
        }
      }

      stream.write(
        indent(1) + '<url>\n' +
        indent(2) + '<loc>' + prefix + filepath + '</loc>\n' +
        indent(1) + '</url>'
      );

  });

  finder.on('end', function() {
      stream.write('</urlset>\n');
      if (stream !== process.stdout) {
        stream.end();
      }
  });
};
