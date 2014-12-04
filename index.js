var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var Buffer = require('buffer').Buffer;
var Handlebars =require('handlebars');
var fs = require('fs');

const PLUGIN_NAME = 'gulp-prefixer';

module.exports = function(file, opt) {
  if (!opt.layout) {
    throw new PluginError(PLUGIN_NAME, 'Please define template.');
  }

  var fileName = path.basename(file);
  var firstFile = new File({path: file});

  var source = fs.readFileSync(opt.layout, 'utf8');
  var template = Handlebars.compile(source);

  var sections = [];

  function bufferContents(file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-concat',  'Streaming not supported'));

    if (file.isBuffer()) {
      sections.push(file.contents);
    }
  }

  function endStream() {
    if (firstFile) {
      var joinedFile = firstFile;

      var templateOptions = {
        section: sections
      };
      if (opt.assets) {
        templateOptions.assets = opt.assets
      }

      joinedFile.contents = new Buffer(template(templateOptions));

      this.emit('data', joinedFile);
    }

    this.emit('end');
  }
  return through(bufferContents, endStream);
};
