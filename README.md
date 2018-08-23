# sitemap-static

[![CircleCI](https://circleci.com/gh/tmcw/sitemap-static.svg?style=svg)](https://circleci.com/gh/tmcw/sitemap-static)
[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/sitemap-static.svg)](https://greenkeeper.io/)

Make a sitemap for a static website based on files on disk

## install

    npm install -g sitemap-static

## usage

Use in the root directory of the files on the site. This will only add
files with `.html` extensions to the sitemap.

    sitemap-static --prefix=http://foo.bar/foo/ . > sitemap.xml

## library API

```javascript
var generateSitemap = require('sitemap-static');
var fs = require('fs');

var writer = fs.createWriteStream('/path/to/your/sitemap.xml');

generateSitemap(writer, {
    findRoot: '.',
    ignoreFile: '',
    prefix: 'http://somesi.te/',
    pretty: false
})
```

## Ignore File

Added in v0.0.1 you can pass the name of a json file to load. File file needs to be
in your current working directory and should be an array of file names (without the / at the front)
that you want ignored.  You can ignore entire directories by leaving off the .html.
Example JSON:

	[
		"ignore-me.html",
		"ignore-everything-in-me/"
	]

Example Command:

	sitemap-static --ignore-file=ignore.json --prefix=http://foo.bar/foo/ . > sitemap.xml

## Pretty URLs

If you pass `--pretty` to the CLI (or `pretty: true` to the JS API), `sitemap-static` will output pretty URLs rather than the whole path to each file. For example:

| Not pretty | Pretty |
| --- | --- |
| `http://www.example.com/index.html` | `http://www.example.com/` |
| `http://www.example.com/about.html` | `http://www.example.com/about` |
| `http://www.example.com/author/index.html` | `http://www.example.com/author` |
| `http://www.example.com/author/main.html` | `http://www.example.com/author/main` |

Example Command:

	sitemap-static --prefix=http://foo.bar/foo/ --pretty . > sitemap.xml
