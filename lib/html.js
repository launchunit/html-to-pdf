
/**
 * Module dependencies.
 * @private
 */
 const jade = require('jade');


/**
 * @params {String} templatesPath (Required)
 * @params {Object} locals (Required)
 *
 * @private
 */
module.exports = (templatesPath, locals) => {

  /**
   * @params {Object} opts.template (Required)
   * @params {Object} opts.data (Optional)
   *
   * @private
   */
  return opts => {

    var html;

    // Compile Jade
    try {

      const htmlFn = jade.compileFile(`${templatesPath}/${opts.template}.jade`, {
        pretty: false,
        compileDebug: false,
        cache: true
      });

      html = htmlFn(Object.assign({},
                    locals,
                    opts,
                    opts.data));
    }
    catch(e) { console.log(e) }

    return html;
  };
};
