# Test Files

This folder contains various test files for the `gulp-remove-empty-lines-html` plugin.

## Files

- **`test.html`** - Input HTML file for testing the plugin
- **`test-processed.html`** - Output file after processing `test.html` with the plugin
- **`gulpfile.js`** - Gulp task for testing the plugin with actual gulp pipeline
- **`test-esm.js`** - ESM (ES6 module) import test
- **`test-cjs.cjs`** - CommonJS require test
- **`process-test.js`** - Script to process test.html and save output to test/output/

## Running Tests

### Process test.html
```bash
node test/process-test.js
```

### Run all tests
```bash
npm test
```

### Run individual tests
```bash
# ESM test
npm run test:esm

# CommonJS test
npm run test:cjs
```

## Test Output

The `process-test.js` script will:
1. Process `test/test.html` using the plugin
2. Save the output to `test/output/test.html`
3. Display the processed content in the console
4. Also save a copy as `test/test-processed.html` for comparison 