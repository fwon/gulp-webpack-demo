// Load in dependencies
var assert = require('assert');
var ndarray = require('ndarray');
var exporters = require('./exporters').exporters;

// Define our canvas constructor
function Canvas(width, height) {
  // Calculate and save dimensions/data for later
  var len = width * height * 4;
  this.width = width;
  this.height = height;
  this.data = new global.Uint8ClampedArray(len);
  this.ndarray = new ndarray(this.data, [width, height, 4]);

  // Create a store for images
  this.images = [];
}
Canvas.prototype = {
  addImage: function addImage (img, x, y) {
    // Save the image for later
    this.images.push({
      img: img,
      x: x,
      y: y
    });
  },
  'export': function exportFn (options, cb) {
    // Grab the exporter
    var format = options.format || 'png';
    var exporter = exporters[format];

    // Assert it exists
    assert(exporter, 'Exporter ' + format + ' does not exist for spritesmith\'s png engine');

    // Render the item
    exporter.call(this, options, cb);
  }
};

// Define an async constructor for our canvas
function createCanvas(width, height, cb) {
  // Create a new canvas and callback
  var canvas = new Canvas(width, height);
  cb(null, canvas);
}

// Expose Canvas and createCanvas to engine
module.exports = {
  Canvas: Canvas,
  createCanvas: createCanvas
};
