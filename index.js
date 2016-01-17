
'use strict';

/**
 * Module dependencies.
 * @private
 */
 const path = require('path'),
  wkhtmltopdf = require('wkhtmltopdf'),
  parsePath = require('parse-filepath'),
  fs = require('fs-extra');


/**
 * Globals
 * @private
 */
var INSTANCE, buildHTML;


/**
 * @params {String} opts.templatesPath (Required)
 * @params {String} opts.locals (Common data pdfs)
 * @public
 */
function Client(opts) {

  if (! opts.templatesPath)
    throw new Error('templatesPath is required.');


  // Init HTML Builder
  buildHTML = require('./lib/html')(
    path.resolve(opts.templatesPath),
    (opts.locals || {}));

  INSTANCE = this;
  return this;
};


Client.prototype = {

  /**
   * @params {String} opts.template (Required)
   * @params {String} opts.outputFile (Required)
   * @params {Object} opts.data
   *
   * @public
   */
  generate: function(opts) {

    return new Promise((resolve, reject) => {

      if (! (opts.template && opts.outputFile)) {
        return reject(new Error('template & outputFile is required.'));
      }

      // Make sure the directory exits
      fs.ensureDirSync(
        path.resolve(parsePath(opts.outputFile).dirname));


      // Generate HTML & Convert to PDF
      wkhtmltopdf(buildHTML(opts), {
        pageSize: 'Letter',
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
      })
      .pipe(fs.createWriteStream(path.resolve(opts.outputFile)))
      .on('error', err => {
        return reject(err);
      })
      .on('finish', done => {
        return resolve(true);
      });

    });
  }

};


module.exports = opts => {
  if (INSTANCE) return INSTANCE;
  return new Client(opts);
}
