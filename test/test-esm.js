// test/test-esm.js
import removeEmptyLinesHtml from '../dist/index.mjs';

console.log('Testing ESM import...');
console.log('Function imported:', typeof removeEmptyLinesHtml);

// Create a simple test
const testHtml = `<!DOCTYPE html>
<html>

<head>
    <title>Test</title>
</head>

<body>
    <!-- This is a comment -->
    <h1>Hello World</h1>
    
    <p>This is a test</p>
    
</body>
</html>`;

// Mock a Vinyl file object for testing
const mockFile = {
  isNull: () => false,
  isStream: () => false,
  path: 'test.html',
  contents: Buffer.from(testHtml)
};

const plugin = removeEmptyLinesHtml({
  removeComments: false
});

// Test the plugin
plugin.write(mockFile);

plugin.on('data', (file) => {
  console.log('✅ ESM test passed!');
  console.log('Processed content:');
  console.log(file.contents.toString());
});

plugin.on('error', (err) => {
  console.error('❌ ESM test failed:', err);
});

plugin.end();
