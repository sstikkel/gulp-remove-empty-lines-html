const fs = require('fs');
const path = require('path');
const Vinyl = require('vinyl');
const { expect } = require('chai');
const removeEmptyLinesHtml = require('./index'); // Adjust path to your plugin file

describe('gulp-remove-empty-lines-html', () => {
  it('should remove empty lines from HTML file', (done) => {
    // Create a test HTML file with empty lines
    const testHtml = `<!DOCTYPE html>
      <html>
          
        <head>
          <title>Test Page</title>
            
        </head>

        <body>

          <h1>Hello World</h1>

        </body>
      </html>
    `;

    // Create a Vinyl file object
    const fakeFile = new Vinyl({
      path: 'test.html',
      contents: Buffer.from(testHtml)
    });

    // Create a stream
    const stream = removeEmptyLinesHtml();

    // Listen for data event
    stream.on('data', (processedFile) => {
      const processedContent = processedFile.contents.toString();
      
      expect(processedContent).to.equal(
`<!DOCTYPE html>
<html>
<head>
<title>Test Page</title>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>`);
      
      done();
    });

    // Write the file to the stream
    stream.write(fakeFile);
    stream.end();
  });

  it('should remove HTML comments when option is set', (done) => {
    // Create a test HTML file with comments
    const testHtml = `
      <!DOCTYPE html>
      <!-- This is a comment -->
      <html>
          <!-- Another comment -->
          <body>
              <h1>Hello World</h1>
              <!-- One more comment -->
          </body>
      </html>
      `;

    // Create a Vinyl file object
    const fakeFile = new Vinyl({
      path: 'test.html',
      contents: Buffer.from(testHtml)
    });

    // Create a stream with removeComments option
    const stream = removeEmptyLinesHtml({ removeComments: true });

    // Listen for data event
    stream.on('data', (processedFile) => {
      const processedContent = processedFile.contents.toString();
      
      expect(processedContent).to.equal(
`<!DOCTYPE html>
<html>
<body>
<h1>Hello World</h1>
</body>
</html>`);
      done();
    });

    // Write the file to the stream
    stream.write(fakeFile);
    stream.end();
  });

  it('should throw an error for non-HTML files', (done) => {
    // Create a Vinyl file object with a non-HTML extension
    const fakeFile = new Vinyl({
      path: 'test.txt',
      contents: Buffer.from('Some content')
    });

    // Create a stream
    const stream = removeEmptyLinesHtml();

    // Listen for error event
    stream.on('error', (err) => {
      expect(err.message).to.include('Only HTML files are supported');
      done();
    });

    // Write the file to the stream
    stream.write(fakeFile);
    stream.end();
  });
});
