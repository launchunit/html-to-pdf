
'use strict';

/**
 * Module dependencies.
 * @private
 */
 const path = require('path'),
  wkhtmltopdf = require('wkhtmltopdf'),
  fs = require('fs');


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
   * @params {String} opts.outputPath (Required)
   * @params {Object} opts.data
   *
   * @public
   */
  generate: function(template, data) {

    return new Promise((resolve, reject) => {

      if (! template) {
        return reject(new Error('template is required'));
      }

      // Generate HTML
      const html = buildHTML({
        template: template.toLowerCase(),
        data: data
      });

      // Convert to PDF
      wkhtmltopdf(html, {
        pageSize: 'Letter',
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
      })
      .pipe(fs.createWriteStream('./out.pdf'))
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
