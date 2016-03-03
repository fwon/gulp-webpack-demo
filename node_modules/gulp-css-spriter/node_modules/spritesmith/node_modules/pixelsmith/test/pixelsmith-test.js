// Load our dependencies
var assert = require('assert');
var fs = require('fs');
var spritesmithEngineTest = require('spritesmith-engine-test');
var pixelsmith = require('../');

// Run our test
// DEV: This covers png and jpeg inputs
spritesmithEngineTest.run({
  engine: pixelsmith,
  engineName: 'pixelsmith'
});

// Define custom tests
var spritesmithUtils = spritesmithEngineTest.spritesmithUtils;
describe('pixelsmith', function () {
  describe('loading a GIF image', function () {
    var gifFilepaths = [__dirname + '/test-files/sprite3.gif'];
    spritesmithUtils.interpretImages(pixelsmith, gifFilepaths);

    describe('when rendered', function () {
      // Render a gif image
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: 100,
        height: 200,
        coordinateArr: [{x: 0, y: 0}],
        exportParams: {
          format: 'gif'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug.gif');
      }

      it('used the first frame of the GIF image', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/single.gif', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });
  });

  describe('working with multiple images', function () {
    describe('outputting a jpeg image', function () {
      // Render a jpeg image
      var multipleImages = spritesmithEngineTest.config.multipleImages;
      spritesmithUtils.interpretImages(pixelsmith, multipleImages.filepaths);
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: multipleImages.width,
        height: multipleImages.height,
        coordinateArr: multipleImages.coordinateArr,
        exportParams: {
          format: 'jpeg'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug.jpg');
      }

      it('outputs a jpeg image', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/multiple.jpg', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });

    describe('outputting a gif image', function () {
      // Render a jpeg image
      var multipleImages = spritesmithEngineTest.config.multipleImages;
      spritesmithUtils.interpretImages(pixelsmith, multipleImages.filepaths);
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: multipleImages.width,
        height: multipleImages.height,
        coordinateArr: multipleImages.coordinateArr,
        exportParams: {
          format: 'gif'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug.gif');
      }

      it('outputs a gif image', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/multiple.gif', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });
  });

  describe('outputting a spritesheet with a custom background', function () {
    var multipleImages = spritesmithEngineTest.config.multipleImages;
    spritesmithUtils.interpretImages(pixelsmith, multipleImages.filepaths);

    describe('when rendered', function () {
      // Render a gif image
      spritesmithUtils.renderCanvas({
        engine: pixelsmith,
        width: multipleImages.width,
        height: multipleImages.height,
        coordinateArr: multipleImages.coordinateArr,
        exportParams: {
          background: [255, 0, 255, 255],
          format: 'jpeg'
        }
      });

      // Allow for debugging
      if (process.env.TEST_DEBUG) {
        spritesmithUtils.debugResult('debug-background.jpeg');
      }

      it('used the expected background', function () {
        var actualImg = fs.readFileSync(__dirname + '/expected-files/background.jpeg', 'binary');
        assert.strictEqual(this.result, actualImg);
      });
    });
  });
});
