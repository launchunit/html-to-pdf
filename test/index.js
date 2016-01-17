
const test = require('ava');


// Init Things
var client;

test.before(t => {

  const opts = {
    templatesPath: '../templates',
    locals: {} // (Common data for all emails) (Optional)
  };

  client = require('../')(opts);
});


test('No Arguments Passed to Generate', t => {
  return client.generate()
  .then(function(res) {
    t.is(res, null);
  })
  .catch(function(e) {
    t.ok(e instanceof Error);
  });
});


test('Only Template Argument Passed', t => {
  return client.generate({
    template: 'sample'
  })
  .then(function(res) {
    t.is(res, null);
  })
  .catch(function(e) {
    t.ok(e instanceof Error);
  });
});


test('Template & outputFile Argument Passed', t => {
  return client.generate({
    template: 'sample',
    outputFile: './output/test.pdf'
  })
  .then(function(res) {
    t.ok(typeof res === 'object');
    t.ok(typeof res.outputFile === 'string');
  })
  .catch(function(e) {
    console.log(e);
    t.is(e, undefined);
  });
});
