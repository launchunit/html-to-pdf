# html-to-pdf
Nodejs client for to generate pdf using http://wkhtmltopdf.org/

----

## Usage

```js
// Create a client instance
const opts = {
  templatesPath: './templates',
  locals: {} // (Common data for all emails) (Optional)
};
const client = require('html-to-pdf')(opts);

// Generate PDF
client.generate({
  template: 'sample', // (Required)
  outputFile: './test/out.pdf', // (Required)
  data: {}, // Data for template
})
.then(function(res) {
  console.log(res.outputFile);
})
.catch(function(e) {
  console.log(e);
});
```


#### Run Tests
```bash
$ npm test
```

#### To Do
- [ ] Pass writable stream
- [ ] Test on Amazon Lambda
- [ ] Test on iron.IO worker
