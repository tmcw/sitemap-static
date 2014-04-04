# sitemap-static

Make a sitemap for a static website based on files on disk

## install

    npm install -g sitemap-static

## usage

Use in the root directory of the files on the site. This will only add
files with `.html` extensions to the sitemap.

    sitemap-static --prefix=http://foo.bar/foo/ .
