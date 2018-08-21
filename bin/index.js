#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2), {
  boolean: "pretty"
});

const generateSitemap = require("../");

const { prefix } = argv;

if (prefix === undefined) {
  process.stdout.write("Error: Missing Prefix.\n");
  process.stdout.write("  Eg: sitemap-static --prefix=http://www.domain.com\n");
  process.exit();
}

if (!prefix.match(/\/$/)) prefix += "/";

generateSitemap(process.stdout, {
  findRoot: argv._[0] || ".",
  ignoreFile: argv["ignore-file"],
  prefix: prefix,
  pretty: argv.pretty
});
