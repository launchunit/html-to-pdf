
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

test('Template Argument Passed', t => {

  return client.generate('sample')
  .then(function(res) {
    t.is(res, true);
  })
  .catch(function(e) {
    t.is(e, undefined);
    // t.ok(e instanceof Error);
  });
});
