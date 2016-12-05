var test = require('tap').test,
  fs = require('fs'),
  concat = require('concat-stream'),
  sitemap = require('./');

test('sitemap - one', function(t) {
  sitemap(concat(function(res) {
    if (process.env.UPDATE) {
      fs.writeFileSync('fixtures/one.xml', res);
    }
    t.equal(res, fs.readFileSync('fixtures/one.xml', 'utf8'));
    t.end();
  }), {
    findRoot: 'fixtures/one',
    prefix: 'http://www.example.com/'
  });
});

test('sitemap - two', function(t) {
  sitemap(concat(function(res) {
    if (process.env.UPDATE) {
      fs.writeFileSync('fixtures/two.xml', res);
    }
    t.equal(res, fs.readFileSync('fixtures/two.xml', 'utf8'));
    t.end();
  }), {
    findRoot: 'fixtures/two/',
    prefix: 'http://www.example.com/'
  });
});

test('sitemap - two - ignore', function(t) {
  sitemap(concat(function(res) {
    if (process.env.UPDATE) {
      fs.writeFileSync('fixtures/two-ignore.xml', res);
    }
    t.equal(res, fs.readFileSync('fixtures/two-ignore.xml', 'utf8'));
    t.end();
  }), {
    findRoot: 'fixtures/two',
    ignoreFile: 'fixtures/ignore.json',
    prefix: 'http://www.example.com/'
  });
});

test('sitemap - three', function(t) {
  sitemap(concat(function(res) {
    if (process.env.UPDATE) {
      fs.writeFileSync('fixtures/three.xml', res);
    }
    t.equal(res, fs.readFileSync('fixtures/three.xml', 'utf8'));
    t.end();
  }), {
    findRoot: 'fixtures/three/',
    prefix: 'http://www.example.com/',
    pretty: true
  });
});
